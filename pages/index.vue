<template>
    <div>
        <v-btn @click="setLocale(locale === 'en' ? 'ar' : 'en')">test</v-btn>
        {{ locale }}
        <p>{{ $t("test") }}</p>
    </div>
</template>

<script setup>
const { locale, setLocale } = useI18n();
</script>
