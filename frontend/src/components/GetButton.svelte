<script lang="ts">
  import { onDestroy } from "svelte";

  import { rows, dates } from "../data/store";
  import api from "../service/api";

  let start: string;
  let end: string;

  const unsubscribe = dates.subscribe((dates) => {
    start = dates.start;
    end = dates.end;
  });

  const handleGet = async () => {
    const data = await api.getKasboek(start, end);
    rows.set(data);
  };

  onDestroy(unsubscribe);
</script>

<button on:click={handleGet}>vraag kasboek op</button>

<style>
</style>
