<script lang="ts">
   import Icon from "./Icon.svelte";

   const themese = [
      'light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate',
      'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden',
      'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black',
      'luxury', 'dracula', 'cmyk', 'autumn', 'business', 'acid', 'lemonade',
      'night', 'coffee', 'winter', 'dim', 'nord', 'sunset', 'caramellatte',
      'abyss', 'silk'
   ];

   const htmlElement = document.querySelector('html')!;

   const defaultTheme = htmlElement.getAttribute('data-theme')!
   let currentTheme = $state(defaultTheme);

   const storedTheme = localStorage.getItem('currentTheme');
   if (storedTheme) {
      setTheme(storedTheme);
   }

   function setTheme(theme: string) {
      htmlElement.setAttribute('data-theme', theme);
      localStorage.setItem('currentTheme', theme);
      currentTheme = theme;
   }
</script>

<div class="dropdown dropdown-end">
   <button class="btn btn-ghost">
      <Icon name="palette" cssClass="size-4" />
      <Icon name="down-arrow" cssClass="size-2" />
   </button>
   <ul class="dropdown-content bg-base-300 rounded-box shadow max-h-100 overflow-scroll">
      {#each themese as theme}
         <li>
            <div class="flex">
               <button
                  class="theme-controller btn btn-ghost text-left w-40"
                  onclick={() => setTheme(theme)}>

                  <div class="w-full">{theme}</div>

                  {#if theme == currentTheme}
                     <Icon name="check" cssClass="size-5" />
                  {/if}
               </button>
            </div>
         </li>
      {/each}
   </ul>
</div>