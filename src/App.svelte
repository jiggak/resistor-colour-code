<script lang="ts">
   import { Colours, valueColours } from './lib';
    import ColourDropdown from './lib/ColourDropdown.svelte';
   import Resistor from './lib/Resistor.svelte';
   // import viteLogo from '/vite.svg'
</script>

<main>
   <nav>
      <div class="dropdown dropdown-end">

      </div>
   </nav>

   <Resistor
      band1={Colours.Red}
      band2={Colours.Green}
      band3={Colours.Brown}
      band4={Colours.Silver}
   />

   <ColourDropdown options={valueColours} />
</main>
