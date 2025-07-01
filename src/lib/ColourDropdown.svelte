<script lang="ts">
   import { type ColourValue } from ".";

   let { options }: {
      options: ColourValue[]
   } = $props();

   // const uid = $props.id();

   let selected: ColourValue | null = $state(null);

   function setSelected(c: ColourValue) {
      (document.activeElement as HTMLButtonElement).blur();
      selected = c;
   }
</script>

{#snippet colour(c:ColourValue)}
   <span class="p-1 min-w-3xs rounded"
      style:background={c.colour.bgColour}
      style:color={c.colour.fgColour}>

      {c.colour.name}
   </span>
{/snippet}

<div class="dropdown">
   <button class="btn text-left">
      {#if selected}
         {@render colour(selected)}
      {:else}
         Select Colour
      {/if}
   </button>
   <ul class="menu dropdown-content bg-base-300 rounded-box shadow">
      {#each options as c}
         <li>
            <button onclick={() => setSelected(c)}>
               {@render colour(c)}
            </button>
         </li>
      {/each}
   </ul>
</div>
