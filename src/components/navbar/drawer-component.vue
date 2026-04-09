<template>
  <v-list v-if="isShowDrawer" class="scollNavigation" color="primary">
    <template v-for="(list, idx) in menuDrawer">
      <div v-if="list.typeMenu == 'menu'" :key="idx">
        <v-list-item v-for="child in list.menu" :key="child.MenuId" :to="child.PathURL" link @click="selectedMenu"
          class="menu">
          <v-icon style="color: #ffffff" left>{{ child.icon }}</v-icon>
          <v-list-item-title style="color: #ffffff" v-text="child.MenuName"></v-list-item-title>
        </v-list-item>
      </div>

      <div v-else :key="idx">
        <v-list-group v-if="list.menu.length > 0" class="menu" v-model="expandedGroups[idx]" no-action color="#ffffff">
          <!-- <v-list-group v-if="list.menu.length > 0" class="menu" v-model="groupMasterdata" no-action color="#ffffff"> -->
          <template v-slot:activator>
            <v-icon style="color: #ffffff" left>{{ list.icon }}</v-icon>
            <v-list-item-title style="color: #ffffff">
              {{ list.groupMenu }}
            </v-list-item-title>
          </template>
          <v-list-item v-for="childM in list.menu" class="highlighted-item pl-10" :key="childM.MenuId"
            :to="childM.PathURL" link>
            <v-list-item-title class="ml-1 primary--text" style="min-height: 30px;" v-text="childM.MenuName"
              @click="highlightGroup"></v-list-item-title>
            <v-icon right>{{ childM.Icon }}</v-icon>
          </v-list-item>
        </v-list-group>
      </div>
    </template>
  </v-list>
</template>
<script>
// import authService from "@/services/auth.service";
export default {
  name: "DrawerComponent",
  data() {
    return {
      isShowDrawer: false,
      isGroupHighlighted: false,
      // Track expanded state for each group dynamically
      expandedGroups: {},

      menuDrawer: [
        {
          groupMenu: 'Menu',
          typeMenu: 'menu',
          icon: '',
          menu: [
            {
              MenuId: 1,
              MenuName: 'Form',
              MenuName_Alt: 'Form',
              PathURL: '/form',
              Icon: '',
              Actions: [
                {
                  PermissionId: 1,
                  PermissionName: 'View',
                  PermissionName_Alt: 'View',
                },
                {
                  PermissionId: 2,
                  PermissionName: 'Add',
                  PermissionName_Alt: 'Add',
                },
                {
                  PermissionId: 3,
                  PermissionName: 'Modify',
                  PermissionName_Alt: 'Modify',
                },
                {
                  PermissionId: 4,
                  PermissionName: 'Delete',
                  PermissionName_Alt: 'Delete',
                },
                {
                  PermissionId: 5,
                  PermissionName: 'Export',
                  PermissionName_Alt: 'Export',
                },
              ],
            },
            {
              MenuId: 2,
              MenuName: 'Dashboard',
              MenuName_Alt: 'Dashboard',
              PathURL: '/dashboard',
              Icon: '',
              Actions: [
                {
                  PermissionId: 6,
                  PermissionName: 'View',
                  PermissionName_Alt: 'View',
                },
                {
                  PermissionId: 7,
                  PermissionName: 'Import',
                  PermissionName_Alt: 'Import',
                },
                {
                  PermissionId: 8,
                  PermissionName: 'Delete',
                  PermissionName_Alt: 'Delete',
                },
                {
                  PermissionId: 9,
                  PermissionName: 'Export',
                  PermissionName_Alt: 'Export',
                },
              ],
            },  
            {
              MenuId: 3,
              MenuName: 'Table',
              MenuName_Alt: 'Table',
              PathURL: '/table',
              Icon: '',
              Actions: [
                {
                  PermissionId: 10,
                  PermissionName: 'View',
                  PermissionName_Alt: 'View',
                },
                {
                  PermissionId: 11,
                  PermissionName: 'Import',
                  PermissionName_Alt: 'Import',
                },
                {
                  PermissionId: 12,
                  PermissionName: 'Delete',
                  PermissionName_Alt: 'Delete',
                },
                {
                  PermissionId: 13,
                  PermissionName: 'Export',
                  PermissionName_Alt: 'Export',
                },
              ],
            },
            {
              MenuId: 4,
              MenuName: 'Tab',
              MenuName_Alt: 'Tab',
              PathURL: '/tab',
              Icon: '',
              Actions: [
                {
                  PermissionId: 14,
                  PermissionName: 'View',
                  PermissionName_Alt: 'View',
                },
                {
                  PermissionId: 15,
                  PermissionName: 'Import',
                  PermissionName_Alt: 'Import',
                },
                {
                  PermissionId: 16,
                  PermissionName: 'Delete',
                  PermissionName_Alt: 'Delete',
                },
                {
                  PermissionId: 17,
                  PermissionName: 'Export',
                  PermissionName_Alt: 'Export',
                },
              ],
            },
          ],
        },
        {
          groupMenu: 'Auto Complete',
          typeMenu: 'groupmenu',
          icon: 'mdi-form-select',
          menu: [
            {
              MenuId: 5,
              MenuName: 'Status',
              MenuName_Alt: 'Status',
              PathURL: '/auto-complete/status',
              Icon: '',
              Actions: [
                {
                  PermissionId: 18,
                  PermissionName: 'View',
                  PermissionName_Alt: 'View',
                },
                {
                  PermissionId: 19,
                  PermissionName: 'Export',
                  PermissionName_Alt: 'Export',
                },
              ],
            },
          ],
        },
        {
          groupMenu: 'Master Data',
          typeMenu: 'groupmenu',
          icon: 'mdi-cog-outline',
          menu: [
            {
              MenuId: 500,
              MenuName: 'ผู้ขนส่ง',
              MenuName_Alt: 'Driver',
              PathURL: '/driver',
              Icon: '',
              Actions: [
                {
                  PermissionId: 500,
                  PermissionName: 'View',
                  PermissionName_Alt: 'View',
                },
                {
                  PermissionId: 501,
                  PermissionName: 'Add',
                  PermissionName_Alt: 'Add',
                },
                {
                  PermissionId: 502,
                  PermissionName: 'Modify',
                  PermissionName_Alt: 'Modify',
                },
                {
                  PermissionId: 503,
                  PermissionName: 'Delete',
                  PermissionName_Alt: 'Delete',
                },
                {
                  PermissionId: 504,
                  PermissionName: 'Export',
                  PermissionName_Alt: 'Export',
                },
              ],
            },
            {
              MenuId: 501,
              MenuName: 'สาเหตุการเคลื่อนย้าย',
              MenuName_Alt: 'Reason',
              PathURL: '/reason',
              Icon: '',
              Actions: [
                {
                  PermissionId: 505,
                  PermissionName: 'View',
                  PermissionName_Alt: 'View',
                },
                {
                  PermissionId: 506,
                  PermissionName: 'Add',
                  PermissionName_Alt: 'Add',
                },
                {
                  PermissionId: 507,
                  PermissionName: 'Modify',
                  PermissionName_Alt: 'Modify',
                },
                {
                  PermissionId: 508,
                  PermissionName: 'Delete',
                  PermissionName_Alt: 'Delete',
                },
                {
                  PermissionId: 509,
                  PermissionName: 'Export',
                  PermissionName_Alt: 'Export',
                },
              ],
            },
            
          ],
        },
      ]
      // groupMasterdata: true,
      // groupReport: true,
    };
  },
  computed: {
    // menuDrawer() {
    //   return this.$store.getters.getMenu.menuList;
    // },
  },
  created() {
    this.isShowDrawer = true;
  },
  methods: {
    highlightGroup() {
      this.isGroupHighlighted = true;
    },
    selectedMenu() {
      // this.groupMasterdata = false;
      // this.groupReport = false;
      // Reset all groups when a menu is selected
      this.expandedGroups = {};
    },
  },
};
</script>
<style scoped>
.v-list-item--active {
  background-color: #8246af !important;
  color: white !important;
}

.child-menu .v-list-item {
  background-color: #8246af;
}

.highlighted-group {
  background-color: #8246af !important;
  color: white !important;
}

.highlighted-group:hover {
  background-color: #8246af !important;
  color: white !important;
}

.highlighted-item {
  background-color: white !important;
  color: #8246af !important;
}

.scollNavigation {
  height: 100%;
  overflow-y: scroll;
}

.scollNavigation::-webkit-scrollbar {
  width: 5px;
  height: 10px;
}

/* / Track / */
.scollNavigation::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 5px;
  width: 5px;
}

/* / Handle / */
.scollNavigation::-webkit-scrollbar-thumb {
  background: #d9dbdb;
  border-radius: 5px;
}

/* / Handle on hover */
.scollNavigation::-webkit-scrollbar-thumb:hover {
  background: #d9dbdb;
  border-radius: 5px;
}
</style>
