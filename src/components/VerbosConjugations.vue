<script lang="ts" setup>
import { verbs } from '@/data/verbs';
import type { VerbType } from '@/interfaces/Conjugations';
import { BASE_CONJUGATION_ENDINGS } from '@/lib';
import { ref } from 'vue';

// --- Reactive state ---
const currentTable = ref<any[]>([]);

// Track currently active verb for highlighting
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
  <div class="p-4 space-y-8">
    <!-- Conjugation Table -->
    <div>
      <h2 class="text-xl font-bold mb-2">Conjugation Table</h2>
      <table class="table-auto border-collapse border border-gray-300 w-full text-center">
        <thead class="bg-slate-600 text-white">
          <tr>
            <th class="border border-gray-300 px-2 py-1">SUJETO</th>
            <th class="border border-gray-300 px-2 py-1">AR</th>
            <th class="border border-gray-300 px-2 py-1">ER</th>
            <th class="border border-gray-300 px-2 py-1">IR</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in currentTable" :key="row.subject">
            <td class="border border-gray-300 px-2 py-1">{{ row.subject }}</td>
            <td
              class="border border-gray-300 px-2 py-1"
              :class="{ 'bg-slate-200 text-slate-600': activeVerb?.type === 'AR' }"
            >
              {{ row.AR }}
            </td>
            <td
              class="border border-gray-300 px-2 py-1"
              :class="{ 'bg-slate-200 text-slate-600': activeVerb?.type === 'ER' }"
            >
              {{ row.ER }}
            </td>
            <td
              class="border border-gray-300 px-2 py-1"
              :class="{ 'bg-slate-200 text-slate-600': activeVerb?.type === 'IR' }"
            >
              {{ row.IR }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Verbs Tables -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="type in ['AR', 'ER', 'IR']" :key="type">
        <h3 class="text-lg font-semibold mb-2">{{ type }} Verbs</h3>
        <table class="table-auto border-collapse border border-gray-300 w-full text-left">
          <thead class="bg-slate-600 text-white">
            <tr>
              <th class="border border-gray-300 px-2 py-1">Infinitive</th>
              <th class="border border-gray-300 px-2 py-1">Translation</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="verb in verbs.filter((v) => v.type === type)"
              :key="verb.infinitive"
              class="cursor-pointer hover:bg-gray-200 hover:text-slate-900"
              @click="onClick(verb.infinitive, type)"
            >
              <td class="border border-gray-300 px-2 py-1">{{ verb.infinitive }}</td>
              <td class="border border-gray-300 px-2 py-1">{{ verb.translation }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
