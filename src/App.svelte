<script lang="ts">
   import { multiplierColours, toleranceColours, valueColours } from './lib';
   import ColourDropdown from './lib/ColourDropdown.svelte';
   import Icon from './lib/Icon.svelte';
   import { ResistorState, ResistorType } from './lib/resistor.svelte';
   import Resistor from './lib/Resistor.svelte';
   import ThemeSelector from './lib/ThemeSelector.svelte';
   // import viteLogo from '/vite.svg'

   const state = new ResistorState();

   function copyToClipboard() {
      navigator.clipboard.writeText(state.resistance);
   }

   function formatMultiplier(v: number) {
      if (v >= 1000000000) {
         return `x${v/1000000000} G`;
      } else if (v >= 1000000) {
         return `x${v/1000000} M`;
      } else if (v >= 1000) {
         return `x${v/1000} k`;
      }

      return `x${v}`;
   }

   function formatTolerance(v: number) {
      return `± ${v}%`;
   }
</script>

<main class="mx-3 flex flex-col items-center gap-4">
   <nav class="navbar bg-base-100">
      <div class="navbar-start">
         <a class="btn btn-ghost btn-circle"
            href="https://github.com/jiggak/resistor-colour-code"
            target="_blank">

            <Icon name="github" />
         </a>
      </div>
      <div class="navbar-center">
         <div class="join">
            <input class="join-item btn" type="radio"
               bind:group={state.type}
               value={ResistorType.FourBand}
               aria-label="4 Bands" />

            <input class="join-item btn" type="radio"
               bind:group={state.type}
               value={ResistorType.FiveBand}
               aria-label="5 Bands" />
         </div>
      </div>
      <div class="navbar-end">
         <ThemeSelector />
      </div>
   </nav>

   <Resistor
      value1={state.value1?.colour}
      value2={state.value2?.colour}
      value3={state.value3?.colour}
      multiplier={state.multiplier?.colour}
      tolerance={state.tolerance?.colour}
   />

   <div class="join">
      <input class="input join-item" type="text"
         value={state.resistance} readonly />

      <button class="btn join-item"
         title="Copy to Clipboard"
         onclick={() => copyToClipboard()}>

         <Icon name="copy-clipboard" />
      </button>
   </div>

   <ColourDropdown
      label="Value 1"
      options={valueColours}
      selected={state.value1}
      setSelected={(c) => state.value1 = c}
   />

   <ColourDropdown
      label="Value 2"
      options={valueColours}
      selected={state.value2}
      setSelected={(c) => state.value2 = c}
   />

   {#if state.type == ResistorType.FiveBand}
      <ColourDropdown
         label="Value 3"
         options={valueColours}
         selected={state.value3}
         setSelected={(c) => state.value3 = c}
      />
   {/if}

   <ColourDropdown
      label="Multiplier"
      options={multiplierColours}
      selected={state.multiplier}
      setSelected={(c) => state.multiplier = c}
      formatValue={formatMultiplier}
   />

   <ColourDropdown
      label="Tolerance"
      options={toleranceColours}
      selected={state.tolerance}
      setSelected={(c) => state.tolerance = c}
      formatValue={formatTolerance}
   />

</main>
