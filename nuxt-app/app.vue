<script setup>
import { useRankingDataFetch } from '~/stores/useFetch'

useRankingDataFetch().useFetchRanking()

</script>
<template>
  <div>
    <NuxtPage />
  </div>
</template>

