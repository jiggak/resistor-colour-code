<script lang="ts">
   import { multiplierColours, toleranceColours, valueColours } from './lib';
   import ColourDropdown from './lib/ColourDropdown.svelte';
   import Icon from './lib/Icon.svelte';
   import { ResistorState, ResistorType } from './lib/resistor.svelte';
   import Resistor from './lib/Resistor.svelte';
   // import viteLogo from '/vite.svg'

   const state = new ResistorState();
</script>

<main class="mx-3 flex flex-col items-center">
   <nav class="navbar bg-base-100">
      <div class="navbar-start"></div>
      <div class="navbar-end">
         <a class="btn btn-ghost" href="https://github.com/jiggak/resistor-colour-code" target="_blank">
            <Icon name="github" />
         </a>
         <!-- TODO theme selector -->
         <!-- <div class="dropdown dropdown-end">
         </div> -->
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
      <input class="join-item btn" type="radio"
         bind:group={state.type}
         value={ResistorType.FourBand}
         aria-label="4 Bands" />

      <input class="join-item btn" type="radio"
         bind:group={state.type}
         value={ResistorType.FiveBand}
         aria-label="5 Bands" />
   </div>

   <fieldset class="fieldset">
      <label class="label">Value 1</label>
      <ColourDropdown
         options={valueColours}
         selected={state.value1}
         setSelected={(c) => state.value1 = c}
      />

      <label class="label">Value 2</label>
      <ColourDropdown
         options={valueColours}
         selected={state.value2}
         setSelected={(c) => state.value2 = c}
      />

      {#if state.type == ResistorType.FiveBand}
         <label class="label">Value 3</label>
         <ColourDropdown
            options={valueColours}
            selected={state.value3}
            setSelected={(c) => state.value3 = c}
         />
      {/if}

      <label class="label">Multiplier</label>
      <ColourDropdown
         options={multiplierColours}
         selected={state.multiplier}
         setSelected={(c) => state.multiplier = c}
      />

      <label class="label">Tolerance</label>
      <ColourDropdown
         options={toleranceColours}
         selected={state.tolerance}
         setSelected={(c) => state.tolerance = c}
      />
   </fieldset>

</main>
