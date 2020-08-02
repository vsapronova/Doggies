<template>
    <div v-if="selected_breed">
        <h1>Photos of {{selected_breed}}</h1>
        <div class="images">
            <img class="image" v-bind:src="image" v-for="image in images" :key="image">
        </div>
    </div>
</template>


<script>
export default {
    name: 'Photos',
    
    data: function() {
        let that = {
            selected_breed: this.$route.params.breed,
            images: []
        }
        fetch(`https://dog.ceo/api/breed/${this.$route.params.breed}/images/random/9`)
            .then(response => {
                response.json()
                .then(json => {
                    that.images = json.message
                }) 
            });
        return that
    }
}
</script>

<style scoped>

.images {
    /* Prevent vertical gaps */
    /* line-height: 0; */
    margin: 20px;
    -webkit-column-count: 3;
    -webkit-column-gap:   10px;
    -webkit-row-gap:      10px;
    -moz-column-count:    3;
    -moz-column-gap:      10px;
    -moz-row-gap:         10px;
    column-count:         3;
    column-gap:           10px;
    row-gap:              10px;
 }
 
img.image {
    width: 100% !important;
    height: auto !important;
}

</style>