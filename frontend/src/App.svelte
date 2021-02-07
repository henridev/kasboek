<script lang="ts">
  import Listing from "./components/Listing.svelte";
  import ParseButton from "./components/ParseButton.svelte";
  import Table from "./components/Table.svelte";
  import Uploader from "./components/Uploader.svelte";
</script>

<main>
  <h1>kasboek verwerker</h1>
  <ParseButton />
  <Uploader />
  <Listing />
  <Table />
</main>

<style>
  main {
    text-align: center;
    font-family: "Ubuntu", sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }

  h1 {
    color: #7b51b3;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
