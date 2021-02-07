<script lang="ts">
  import { onDestroy } from "svelte";
  import type { renderedFile } from "../models/RenderedFile";
  import { files } from "../data/store";
  let rendered_files: renderedFile[] = [];

  const unsubscribe = files.subscribe((new_file) => {
    rendered_files = new_file;
  });

  onDestroy(unsubscribe);
</script>

<div>
    {#if rendered_files.length < 1}
        <h1>nog geen bestanden beschikbaar voor verwerking</h1>
        <h2>gelieve bestanden op te laden</h2>
    {/if}
    <ul>
        {#each rendered_files as {file, isParsed}}
          <li class="{isParsed ? 'processed' : ''}">
            {file.name}
          </li>
        {/each}
    </ul>
</div>


<style>
  div {
    min-height: 200px;
    max-width: 85%;
  }
  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  }
  li{
    width: 150px;
    height: 30px;
    margin: 5px;
    color: white;
    background-color: #7b51b3;
    display: flex;
 
    justify-content: center;
    align-items: center;
  }
  ul li::before {
    content: "❌";
    margin-right: 10px;
  }
  ul li.processed::before {
    content: "☑️";
  }
  .processed {
    background-color: #009879;
  }
</style>
