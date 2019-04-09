<template>
  <div class="home">
    <div class="search-container p-2">
      <b-input-group>
        <b-input-group-prepend is-text>
          <font-awesome-icon icon="search"/>
        </b-input-group-prepend>
        <b-form-input type="text" v-model="searchInput" placeholder="Search..."></b-form-input>
        <b-input-group-append is-text>
          <a href="https://github.com/Sowce/riven-lookup" target="_blank" rel="noopener noreferrer">
            <font-awesome-icon :icon="['fab', 'github']"/>
          </a>
        </b-input-group-append>
      </b-input-group>
    </div>
    <table class="table b-table table-striped">
      <thead>
        <tr>
          <th
            v-for="(field, index) in fields"
            :key="`${field.key}-${index}`"
            class="header"
            @click="orderBy(field)"
          >
            <span class="header-ctn">
              {{ field.key }}
              <font-awesome-icon class="sort-icon" :icon="sortIcon(field.sort)"/>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(riven, index) in rivens" :key="index">
          <td v-for="(value, key) of riven" :key="key">{{ value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import _ from "lodash";

const includesWithoutCase = (str, val) => {
  if (!str) return false;
  return str.toLowerCase().includes(val.toLowerCase());
};

export default {
  data() {
    return {
      searchInput: "",
      order: { by: "compatibility", desc: false },
      fields: [
        {
          key: "itemType",
          sort: {
            state: false,
            asc: true
          }
        },
        {
          key: "compatibility",
          sort: {
            state: true,
            asc: true
          }
        },
        {
          key: "rerolled",
          sort: {
            state: false,
            asc: true
          }
        },
        {
          key: "avg",
          sort: {
            state: false,
            asc: true
          }
        },
        {
          key: "stddev",
          sort: {
            state: false,
            asc: true
          }
        },
        {
          key: "min",
          sort: {
            state: false,
            asc: true
          }
        },
        {
          key: "max",
          sort: {
            state: false,
            asc: true
          }
        },
        {
          key: "pop",
          sort: {
            state: false,
            asc: true
          }
        },
        {
          key: "median",
          sort: {
            state: false,
            asc: true
          }
        }
      ]
    };
  },
  methods: {
    orderBy(field) {
      console.log(field);
      if (!field.sort.state) {
        field.sort.state = true;
      } else {
        if (field.sort.asc) {
          field.sort.asc = false;
        } else {
          field.sort.asc = true;
          field.sort.state = false;
        }
      }
    },
    sortIcon(sort) {
      if (sort.state) {
        return sort.asc ? "sort-up" : "sort-down";
      }
      return "sort";
    }
  },
  computed: {
    rivens() {
      if (!this.$store.state.init) return [];
      console.log(!this.order.desc);
      return _.orderBy(
        this.$store.state.rivens
          .slice()
          .filter(
            riven =>
              includesWithoutCase(riven.compatibility, this.searchInput) ||
              includesWithoutCase(riven.itemType, this.searchInput)
          ),
        this.fields.filter(field => field.sort.state).map(field => field.key),
        this.fields
          .filter(field => field.sort.state)
          .map(field => (field.sort.asc ? "asc" : "desc"))
      );
    }
  }
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 4em;
}

table.table thead tr th {
  border-bottom: none;
  border-top: none;
}
.search-container {
  position: fixed;
  width: 100%;
  top: 0.5em;
}
th.header {
  text-align: center;
  cursor: pointer;
  color: rgb(217, 215, 211);
}
td {
  color: rgb(217, 215, 211);
}
span.header-ctn {
  display: flex;
  justify-content: center;
  align-items: center;
}
.sort-icon {
  margin-left: 2px;
}
input.form-control,
.input-group-prepend > .input-group-text,
.input-group-append > .input-group-text {
  color: rgb(201, 197, 191);
  background-color: rgb(23, 24, 28);
  border-top-color: rgb(54, 63, 72);
  border-right-color: rgb(54, 63, 72);
  border-bottom-color: rgb(54, 63, 72);
  border-left-color: rgb(54, 63, 72);
}
</style>
