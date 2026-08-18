import { useAuth } from "@clerk/expo";
import {
  StreamVideo,
  StreamVideoClient,
  type DeepPartial,
  type Theme,
} from "@stream-io/video-react-native-sdk";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { fetchStreamSession } from "@/lib/stream";

function VideoWithInsets({
  client,
  children,
}: {
  client: StreamVideoClient;
  children: ReactNode;
}) {
  const { top, right, bottom, left } = useSafeAreaInsets();
  const theme: DeepPartial<Theme> = {
    variants: { insets: { top, right, bottom, left } },
  };
  return (
    <StreamVideo client={client} style={theme}>
      {children}
    </StreamVideo>
  );
}

export default function StreamVideoProvider({
  userId,
  children,
}: {
  userId: string;
  children: ReactNode;
}) {
  const { getToken } = useAuth();
  // @clerk/expo returns a new `getToken` function identity on every render,
  // so it can't safely sit in the effect's dependency array below (that
  // would reconnect the Stream client on every unrelated re-render). Keep
  // the latest one in a ref instead.
  const getTokenRef = useRef(getToken);
  useEffect(() => {
    getTokenRef.current = getToken;
  }, [getToken]);

  const [client, setClient] = useState<StreamVideoClient>();

  useEffect(() => {
    let cancelled = false;
    let current: StreamVideoClient | undefined;

    const tokenProvider = async () => {
      const session = await fetchStreamSession(() => getTokenRef.current());
      return session.token;
    };

    (async () => {
      try {
        const session = await fetchStreamSession(() => getTokenRef.current());
        if (cancelled) return;

        current = StreamVideoClient.getOrCreateInstance({
          apiKey: session.apiKey,
          user: {
            id: session.userId,
            name: session.userName,
            image: session.userImage,
          },
          token: session.token,
          tokenProvider,
        });
        setClient(current);
      } catch (err) {
        console.error("Failed to connect to Stream", err);
      }
    })();

    return () => {
      cancelled = true;
      current?.disconnectUser().catch((err) => console.error(err));
      setClient(undefined);
    };
  }, [userId]);

  if (!client) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#6C4EF5" />
      </View>
    );
  }

  return <VideoWithInsets client={client}>{children}</VideoWithInsets>;
}
