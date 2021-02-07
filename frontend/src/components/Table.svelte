<script lang="ts">
  import { onDestroy } from "svelte";
  import { rows } from "../data/store";
  import type { Row } from "../models";
  import { utils, write } from "xlsx";
  import api from "../service/api";
  import { saveAs } from "file-saver";

  let start: string;
  let end: string;

  let rendered_rows: Row[];
  let tableElement;

  const unsubscribe = rows.subscribe((new_rows) => {
    rendered_rows = new_rows;
  });

  const handleDownload = async () => {
    const wb = utils.book_new();
    const ws = utils.json_to_sheet(rendered_rows);
    wb.SheetNames.push("kasboek");
    wb.Sheets["kasboek"] = ws;
    const wbout = write(wb, {
      bookType: "xlsx",
      bookSST: true,
      type: "binary",
    });
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }
    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "test.xlsx");
  };

  onDestroy(unsubscribe);
</script>

<button on:click={handleDownload}>download kasboek</button>
<table class="styled-table" bind:this={tableElement}>
  <thead>
    <tr>
      <th>datum</th>
      <th>omzet</th>
      <th>cheque delhaize</th>
      <th>tegoebon</th>
      <th>publiciteitsbon</th>
      <th>leeggoedbon</th>
      <th>bancontact</th>
      <th>op krediet</th>
      <th>andere</th>
      <th>amex</th>
      <th>visa</th>
      <th>mastercard</th>
      <th>maestro</th>
      <th>visa_electron</th>
      <th>payfair</th>
      <th>sodexo</th>
      <th>accordenred</th>
      <th>som totaal</th>
      <th>verschil</th>
      <th>cash</th>
    </tr>
  </thead>
  <tbody>
    {#each rendered_rows as row}
      <tr>
        <td>
          {row.datum.substring(0, 10)}
        </td>
        <td>
          {row.omzet}
        </td>
        <td>
          {row.cheque_delhaize}
        </td>
        <td>
          {row.tegoebon}
        </td>
        <td>
          {row.publiciteitsbon}
        </td>
        <td>
          {row.leeggoedbon}
        </td>
        <td>
          {row.bancontact}
        </td>
        <td>
          {row.op_krediet}
        </td>
        <td>
          {row.andere}
        </td>
        <td>
          {row.amex}
        </td>
        <td>
          {row.visa}
        </td>
        <td>
          {row.mastercard}
        </td>
        <td>
          {row.maestro}
        </td>
        <td>
          {row.visa_electron}
        </td>
        <td>
          {row.payfair}
        </td>
        <td>
          {row.sodexo}
        </td>
        <td>
          {row.accordenred}
        </td>
        <td>
          {row.som_totaal}
        </td>
        <td>
          {row.verschil}
        </td>
        <td>
          {row.cash}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .styled-table {
    width: 90%;
    border-collapse: collapse;
    margin: 25px 20px;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  }
  .styled-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
  }
  .styled-table th,
  .styled-table td {
    padding: 12px 15px;
  }
  .styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  .styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  .styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }
  .styled-table tbody tr:hover {
    font-weight: bold;
    color: #fff;
    background-color: #00987a8c;
  }
</style>
