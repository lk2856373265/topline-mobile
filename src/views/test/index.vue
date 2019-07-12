<template>
  <div>
    <!-- <p>test components</p>
    <input v-validate="'required|email'" name="email" type="text">
    <span>{{ errors.first('email') }}</span>
    <input v-validate="'required'" name="username" type="text">
    <span>{{ errors.first('username') }}</span> -->
    <van-cell-group>
      <van-field v-model="username"
       v-validate="'required'"
       placeholder="请输入用户名"
       name="username"
       :error-message="errors.first('username')"
        />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'TextIndex',
  data () {
    return {}
  }
}
</script>

<style >
</style>
