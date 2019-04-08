<template>
  <div class="home">
    <input type="text" v-model="searchInput" placeholder="Search..." class="search-input">
    <table>
      <tr>
        <td @click="orderBy('itemType', $event)">itemType</td>
        <td @click="orderBy('compatibility', $event)">compatibility</td>
        <td @click="orderBy('rerolled', $event)">rerolled</td>
        <td @click="orderBy('avg', $event)">avg</td>
        <td @click="orderBy('stddev', $event)">stddev</td>
        <td @click="orderBy('min', $event)">min</td>
        <td @click="orderBy('max', $event)">max</td>
        <td @click="orderBy('pop', $event)">pop</td>
        <td @click="orderBy('median', $event)">median</td>
      </tr>
      <tr
        v-for="riven of rivens"
        :key="riven.itemType + '.' + riven.compatibility + '.' + riven.rerolled"
      >
        <td>{{riven.itemType}}</td>
        <td>{{riven.compatibility}}</td>
        <td>{{ riven.rerolled ? 'Yes' : 'No' }}</td>
        <td>{{riven.avg}}</td>
        <td>{{riven.stddev}}</td>
        <td>{{riven.min}}</td>
        <td>{{riven.max}}</td>
        <td>{{riven.pop}}</td>
        <td>{{riven.median}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
const includesWithoutCase = (str, val) => {
  if (!str) return false;
  return str.toLowerCase().includes(val.toLowerCase());
};

export default {
  data() {
    return {
      searchInput: "",
      order: { by: "compatibility", desc: false }
    };
  },
  methods: {
    orderBy(value) {
      let orderBy = value;
      console.log(orderBy);
      if (orderBy === this.order.by)
        return (this.order.desc = !this.order.desc);
      this.order.by = orderBy;
    }
  },
  computed: {
    rivens() {
      const _self = this;
      if (!this.$store.state.init) return [];
      return this.$store.state.rivens
        .slice()
        .filter(
          riven =>
            includesWithoutCase(riven.compatibility, this.searchInput) ||
            includesWithoutCase(riven.itemType, this.searchInput)
        )
        .sort((a, b) => {
          var nameA = a[_self.order.by],
            nameB = b[_self.order.by];
          if (nameA < nameB)
            //sort string ascending
            return _self.order.desc ? 1 : -1;
          if (nameA > nameB) return _self.order.desc ? -1 : 1;
          return 0; //default return value (no sorting)
        });
    }
  }
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid black;
}
.search-input {
  margin-bottom: 1em;
}
</style>
