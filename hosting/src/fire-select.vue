<template>
    <div>
        <v-select :value="_value" v-on:input="onInput" :options="_options" multiple></v-select>
    </div>
</template>

<script>
export default {
    props: ['value', 'options', "labelKey"],
    data:()=>({
        selected:{}
    }),
    computed:{
        _options:function(){
            return this.options.map((item) => {
                return { label: item[this.labelKey], value: item[".key"] };
            })
        },
        _value:function(){
            return this._options.filter(v => {
                return Object.keys(this.value).includes(v.value);
            })
        }
    },
    methods:{
        onInput: function (e){
            const selected = e;
            let ret = {};
            for (let v of selected) {
                ret[v.value] = true;
            }
            if( Object.keys(this.selected).length != Object.keys(ret).length ) this.$emit('input', ret)
            this.selected = ret;
        }
    }
};
</script>
