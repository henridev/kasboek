<script lang="ts">
  import { onDestroy } from "svelte";
  import { rows } from "../data/store";
  import type { Row } from "../models";
  import api from "../service/api"

  let entries_to_upload: Row[];
  let successMessage: string;

  const unsubscribe = rows.subscribe((new_rows) => {
    entries_to_upload = new_rows;
  });

  onDestroy(unsubscribe);

  const handleUpload = async () => {
    if (entries_to_upload) {
     successMessage = await api.postKasboek(entries_to_upload)
    }
  };

 $: if(successMessage) {
   setTimeout(()=>{
     successMessage = ""
   }, 5000)
 }
</script>

<button on:click={handleUpload}>upload kasboek</button>
{#if successMessage}
  <h4>upload geslaagd</h4>
{/if}

<style>
</style>
