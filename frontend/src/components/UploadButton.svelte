<script lang="ts">
  import { onDestroy } from "svelte";
  import { rows } from "../data/store";
  import type { Row } from "../models";
  import api from "../service/api"

  let entries_to_upload: Row[];

  const unsubscribe = rows.subscribe((new_rows) => {
    entries_to_upload = new_rows;
  });

  onDestroy(unsubscribe);

  const handleUpload = async () => {
    if (entries_to_upload) {
      api.postKasboek(entries_to_upload)
    }
  };
</script>

<button on:click={handleUpload}>upload kasboek</button>

<style>
</style>
