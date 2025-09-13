<script lang="ts" setup>
import { verbs } from '@/data/verbs';
import type { VerbItem, VerbType } from '@/interfaces/Conjugations';
import { BASE_CONJUGATION_ENDINGS } from '@/lib';
import { computed, ref } from 'vue';

// --- Reactive state ---
const currentTable = ref<any[]>([]);
const typeVisible = ref('AR');
const verbFilter = ref('');

const filteredVerbs = computed(() => {
  if (verbFilter.value === '') return verbs;

  return verbs.filter((v: VerbItem) => {
    return v.infinitive.includes(verbFilter.value) || v.translation.includes(verbFilter.value);
  });
});

const revealType = (type: VerbType) => {
  typeVisible.value = type;
};

const activeVerb = ref<{ type: VerbType; infinitive: string } | null>(null);

// --- Initialize table with first verbs of each type ---
const firstAR = verbs.find((v) => v.type === 'AR')?.infinitive ?? 'hablar';
const firstER = verbs.find((v) => v.type === 'ER')?.infinitive ?? 'comer';
const firstIR = verbs.find((v) => v.type === 'IR')?.infinitive ?? 'vivir';

currentTable.value = Object.entries(BASE_CONJUGATION_ENDINGS).map(([subject, endings]) => ({
  subject,
  AR: firstAR.slice(0, -2).toUpperCase() + endings.AR,
  ER: firstER.slice(0, -2).toUpperCase() + endings.ER,
  IR: firstIR.slice(0, -2).toUpperCase() + endings.IR,
}));

// --- Handler for clicking a verb ---
const onClick = (verb: string, type: VerbType) => {
  typeVisible.value = type;
  const stem = verb.slice(0, -2).toUpperCase();
  activeVerb.value = { type, infinitive: verb };

  currentTable.value = currentTable.value.map((row) => {
    const endings = BASE_CONJUGATION_ENDINGS[row.subject];
    if (!endings || !endings[type]) return row;

    return {
      ...row,
      [type]: stem + endings[type],
    };
  });
};
</script>

<template>
  <div class="flex flex-wrap gap-4 pb-80 lg:pb-0 min-h-screen">
    <!-- Verbs Lists -->
    <div class="flex-1 flex flex-wrap gap-4">
      <div v-for="type in ['AR', 'ER', 'IR']" :key="type" class="flex-1 min-w-[200px] p-4">
        <h3
          class="text-lg font-semibold mb-2 cursor-pointer text-white transition-colors duration-200"
          @click="revealType(type)"
        >
          {{ type }} Verbs
        </h3>
        <table class="table-auto w-full text-left text-sm font-medium tracking-wide">
          <thead class="bg-sky-500 text-white sticky top-0 z-10 shadow">
            <tr>
              <th class="px-2 py-1 rounded-tl-lg">Infinitive</th>
              <th class="px-2 py-1 rounded-tr-lg">Translation</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="verb in filteredVerbs.filter((v) => v.type === type)"
              :key="verb.infinitive"
              class="cursor-pointer hover:bg-sky-500 hover:text-white transition-colors duration-200"
              @click="onClick(verb.infinitive, type)"
            >
              <td class="px-2 py-1">{{ verb.infinitive }}</td>
              <td class="px-2 py-1">{{ verb.translation }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="bg-slate-800">
      <div
        class="w-full p-2 lg:w-96 border-t bg-slate-800 border-t-blue-500 max-h-96 rounded lg:border-0 sm:w-full overflow-y-auto fixed bottom-0 left-0 right-0 lg:sticky lg:top-4 lg:bottom-auto z-50"
      >
        <h2 class="text-xl font-bold mb-2 sticky top-0 z-20 text-white">Conjugation Table</h2>
        <input
          v-model="verbFilter"
          class="p-2 w-full mb-2 bg-slate-700 rounded-0"
          type="text"
          placeholder="Filter Verbs"
        />
        <div class="overflow-y-auto scroll-smooth">
          <table class="table-auto w-full text-center text-sm font-medium tracking-wide">
            <thead class="bg-sky-500 sticky top-0 z-30 shadow">
              <tr>
                <th class="px-2 py-1 w-32">SUJETO</th>
                <th v-if="typeVisible === 'AR'" class="px-2 py-1 w-48">AR</th>
                <th v-if="typeVisible === 'ER'" class="px-2 py-1 w-48">ER</th>
                <th v-if="typeVisible === 'IR'" class="px-2 py-1 w-48">IR</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in currentTable"
                :key="row.subject"
                class="transition-colors duration-150"
              >
                <td class="px-2 py-1">{{ row.subject }}</td>
                <td v-if="typeVisible === 'AR'" class="px-2 py-1 rounded-md">
                  {{ row.AR }}
                </td>
                <td v-if="typeVisible === 'ER'" class="px-2 py-1 rounded-md">
                  {{ row.ER }}
                </td>
                <td v-if="typeVisible === 'IR'" class="px-2 py-1 rounded-md">
                  {{ row.IR }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
