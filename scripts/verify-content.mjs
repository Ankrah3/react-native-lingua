import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(scriptDir, "..", "data");

const lessons = readFileSync(path.join(dataDir, "lessons.ts"), "utf8");
const units = readFileSync(path.join(dataDir, "units.ts"), "utf8");
const languages = readFileSync(path.join(dataDir, "languages.ts"), "utf8");

// Match only top-level Lesson objects (lessonId immediately followed by
// unitId then languageId), so nested Activity.lessonId references aren't
// mistaken for duplicate lesson definitions.
const lessonHeaders = [
  ...lessons.matchAll(
    /lessonId: "([^"]+)",\s*\n\s*unitId: "([^"]+)",\s*\n\s*languageId: "([^"]+)"/g,
  ),
];
const lessonIds = lessonHeaders.map((m) => m[1]);
const unitIds = lessonHeaders.map((m) => m[2]);
const langIds = lessonHeaders.map((m) => m[3]);

const definedUnits = [...units.matchAll(/unitId: "([^"]+)"/g)].map((m) => m[1]);
const definedLangs = [...languages.matchAll(/languageId: "([^"]+)"/g)].map(
  (m) => m[1],
);
const unitLangByUnitId = new Map(
  [...units.matchAll(/unitId: "([^"]+)",\s*\n\s*languageId: "([^"]+)"/g)].map(
    (m) => [m[1], m[2]],
  ),
);

// A language entry's block runs from its languageId match up to the next
// one (or end of file), so field order elsewhere in the object doesn't matter.
const languageIdMatches = [...languages.matchAll(/languageId: "([^"]+)"/g)];
const comingSoonLangs = new Set(
  languageIdMatches
    .filter((m, i) => {
      const end =
        i + 1 < languageIdMatches.length
          ? languageIdMatches[i + 1].index
          : languages.length;
      return /comingSoon:\s*true/.test(languages.slice(m.index, end));
    })
    .map((m) => m[1]),
);
const unitLangs = new Set([...units.matchAll(/languageId: "([^"]+)"/g)].map((m) => m[1]));
const lessonLangs = new Set(langIds);
const languagesMissingContent = definedLangs.filter(
  (id) =>
    !comingSoonLangs.has(id) && !(unitLangs.has(id) && lessonLangs.has(id)),
);

const dupLessons = lessonIds.filter((id, i) => lessonIds.indexOf(id) !== i);
const dupUnits = definedUnits.filter((id, i) => definedUnits.indexOf(id) !== i);
const dupLangs = definedLangs.filter((id, i) => definedLangs.indexOf(id) !== i);
const badUnits = unitIds.filter((id) => !definedUnits.includes(id));
const badLangs = langIds.filter((id) => !definedLangs.includes(id));
const mismatchedParents = lessonIds
  .map((id, i) => ({ lessonId: id, unitId: unitIds[i], languageId: langIds[i] }))
  .filter(
    ({ unitId, languageId }) =>
      unitLangByUnitId.has(unitId) && unitLangByUnitId.get(unitId) !== languageId,
  );

const problems = [];
if (dupLessons.length) problems.push(`Duplicate lessonId(s): ${[...new Set(dupLessons)].join(", ")}`);
if (dupUnits.length) problems.push(`Duplicate unitId(s): ${[...new Set(dupUnits)].join(", ")}`);
if (dupLangs.length) problems.push(`Duplicate languageId(s): ${[...new Set(dupLangs)].join(", ")}`);
if (badUnits.length) problems.push(`Lesson(s) reference undefined unitId: ${[...new Set(badUnits)].join(", ")}`);
if (badLangs.length) problems.push(`Lesson(s) reference undefined languageId: ${[...new Set(badLangs)].join(", ")}`);
if (mismatchedParents.length)
  problems.push(
    `Lesson(s) whose languageId doesn't match their unit's languageId: ${mismatchedParents
      .map((m) => m.lessonId)
      .join(", ")}`,
  );
if (languagesMissingContent.length)
  problems.push(
    `Language(s) defined without units/lessons content (add content or mark comingSoon: true): ${languagesMissingContent.join(", ")}`,
  );

if (problems.length) {
  console.error("Content verification failed:");
  problems.forEach((p) => console.error(`  - ${p}`));
  process.exit(1);
}

console.log(
  `Content OK: ${definedLangs.length} languages, ${definedUnits.length} units, ${lessonIds.length} lessons.`,
);
