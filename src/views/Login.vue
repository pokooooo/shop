<template>
    <div class="login">
        <login-form></login-form>
    </div>
</template>

<script>
    import LoginForm from "../components/login/LoginForm";

    export default {
        name: "Login",
        components: {
            LoginForm,
        }
    }
</script>

<style scoped>
    .login{

    }
</style>