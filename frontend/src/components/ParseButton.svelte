<script lang="ts">
  let success: boolean = false;
  $: doubled = success;
  let clickCount = 0;

  $: if(clickCount === 3){
      console.log('reset')
      clickCount = 0;
  }

  function handleClick(e: Event) {
    success = true;
    clickCount++
  }


</script>

<button on:click={handleClick}>verwerk kasboeken</button>
{#if success}
  <div>success {doubled}</div>
{/if}

<style>
</style>
