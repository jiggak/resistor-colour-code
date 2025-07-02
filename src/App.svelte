<script lang="ts">
   import { multiplierColours, toleranceColours, valueColours, type ColourValue } from './lib';
   import ColourDropdown from './lib/ColourDropdown.svelte';
   import Icon from './lib/Icon.svelte';
   import Resistor from './lib/Resistor.svelte';
   // import viteLogo from '/vite.svg'

   let bands: ColourValue[] = $state(new Array(4))
</script>

<main>
   <nav class="navbar bg-base-100">
      <div class="navbar-start"></div>
      <div class="navbar-end">
         <a class="btn btn-ghost" href="https://github.com/jiggak/resistor-colour-code">
            <Icon name="github" />
         </a>
         <!-- TODO theme selector -->
         <!-- <div class="dropdown dropdown-end">
         </div> -->
      </div>

   </nav>

   <Resistor
      value1={bands[0]?.colour}
      value2={bands[1]?.colour}
      multiplier={bands[2]?.colour}
      tolerance={bands[3]?.colour}
   />

   <fieldset class="fieldset">
      <label class="label">Band 1</label>
      <ColourDropdown
         options={valueColours}
         selected={bands[0]}
         setSelected={(c) => bands[0] = c}
      />

      <label class="label">Band 2</label>
      <ColourDropdown
         options={valueColours}
         selected={bands[1]}
         setSelected={(c) => bands[1] = c}
      />

      <label class="label">Band 3</label>
      <ColourDropdown
         options={multiplierColours}
         selected={bands[2]}
         setSelected={(c) => bands[2] = c}
      />

      <label class="label">Band 4</label>
      <ColourDropdown
         options={toleranceColours}
         selected={bands[3]}
         setSelected={(c) => bands[3] = c}
      />
   </fieldset>

</main>
