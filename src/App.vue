<template>
  <v-app>
    <v-navigation-drawer color="primary" v-model="drawer" height="100%" clipped app left>
      <Drawer />
    </v-navigation-drawer>
    <v-app-bar app color="primary" clipped-left dark>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        color="white darken-2"
      ></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain :src="logo" transition="scale-transition" width="40" />
        <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100" :src="ibcLogo"
          width="100" />
      </div>

      <v-spacer></v-spacer>

      <v-btn text>
        <!-- <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      > -->
        <v-icon class="mr-2">mdi-information-outline</v-icon>
        <span>version 1.0.0</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>


  <!-- <v-app class="bg-navbar">
    <v-navigation-drawer
      color="primary"
      v-model="drawer"
      height="100%"
      clipped
      app
      left
      v-if="isShowDrawer"
    >
      <Drawer />
    </v-navigation-drawer>
    <v-app-bar app color="primary" clipped-left dark>
      <v-app-bar-nav-icon
        v-if="isShowDrawer"
        @click.stop="drawer = !drawer"
        color="white darken-2"
      ></v-app-bar-nav-icon>
      <v-toolbar-title style="color: white">
        <router-link to="/home" tag="button">
          <p class="font-title text-h5" style="margin-top: 16px">
            {{ appName }}
          </p>
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-title class="name-title text-white">
        <v-avatar size="35">
          <img src="@/assets/icon/imageuser.svg" />
        </v-avatar>
        {{ user.firstName + "\n&nbsp;\n" + user.lastName }}
        <v-btn
          class="mx-4"
          style="border-color: black"
          outlined
          @click="onSwitchPlant"
        >
          <v-icon>mdi-map-marker </v-icon>
          {{ plantCode }}
        </v-btn>
      </v-toolbar-title>
      <BarRight />
    </v-app-bar>
    <router-view />
    <ConfirmDialog
      :title="'ยืนยันการเปลี่ยน'"
      :message="'คุณแน่ใจหรือไม่ว่าต้องการเปลี่ยน Plant ?'"
      :show="showConfirmDialog"
      @confirmed="handleSwitchPlant"
      @cancel="onCancel"
    />
  </v-app> -->
</template>

<script>

import Drawer from "@/components/navbar/drawer-component.vue";

export default {
  name: 'App',
  components: { Drawer, },
  data: () => ({
    drawer: false,
    logo: require('@/assets/logo.svg'),
    ibcLogo: require('@/assets/ibc_logo.png'),
  }),
};
</script>

