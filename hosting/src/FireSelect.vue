<template>
    <v-select v-model="edit.teams" :options="teamsOptions" multiple></v-select>
</template>

<script>
export default {
    props: ['value', 'options', "labelKey"],
    data:()=>{
        return { 
            selected: this.value
        };
    }
}
</script>
