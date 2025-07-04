<script lang="ts">
   import { slide } from "svelte/transition";
   import { type ColourValue } from ".";
   import Icon from "./Icon.svelte";

   let { label, options, selected, setSelected, formatValue }: {
      label: string,
      options: ColourValue[],
      selected?: ColourValue,
      setSelected(val:ColourValue): void,
      formatValue?(val:number): string
   } = $props();

   // const uid = $props.id();

   function onSelectColour(c: ColourValue) {
      (document.activeElement as HTMLButtonElement).blur();
      setSelected(c);
   }

   function value(v: number): string|number {
      if (formatValue) {
         return formatValue(v);
      }

      return v;
   }
</script>

{#snippet colour(c: ColourValue, css: string)}
   <div class="px-3 py-1 rounded-field flex font-semibold {css}"
      style:background={c.colour.bgColour}
      style:color={c.colour.fgColour}>

      <div class="grow">{c.colour.name}</div>
      <div>{value(c.value)}</div>
   </div>
{/snippet}

<label class="floating-label">
   {#if selected}
      <span transition:slide>{label}</span>
   {/if}
   <div class="dropdown">
      <button class="btn px-1.5 min-w-70">
         {#if selected}
            {@render colour(selected, "grow text-left")}
         {:else}
            <span class="grow">Select {label}</span>
         {/if}
         <Icon name="down-arrow" cssClass="size-3" />
      </button>
      <ul class="dropdown-content menu min-w-70 bg-base-300 rounded-box shadow">
         {#each options as c}
            <li>
               <button class="px-1.5" onclick={() => onSelectColour(c)}>
                  {@render colour(c, "col-start-1 col-end-3")}
               </button>
            </li>
         {/each}
      </ul>
   </div>
</label>