<template>
    <h1>Login</h1>
</template>

<script>
definePageMeta({ middleware: "guest-only", auth: { authenticatedRedirectTo: "/profile" } })
</script>
