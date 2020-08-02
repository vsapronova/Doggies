<template>
    <div v-if="selected_breed">
        <div class="head_photos">
            <h1>Photos of {{selected_breed}}</h1>
            <div v-on:click="close()" class="close"></div>
        </div>   
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
            images: [],
            close: function() {
                this.$router.push({name: "Selector"})
            }
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

.head_photos {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    background-color: white;
}

.images {
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

@media (max-width: 1200px) {
  .images {
  -moz-column-count:    4;
  -webkit-column-count: 4;
  column-count:         4;
  }
}
@media (max-width: 1000px) {
  .images {
  -moz-column-count:    3;
  -webkit-column-count: 3;
  column-count:         3;
  }
}
@media (max-width: 800px) {
  .images {
  -moz-column-count:    2;
  -webkit-column-count: 2;
  column-count:         2;
  }
}
@media (max-width: 400px) {
  .images {
  -moz-column-count:    1;
  -webkit-column-count: 1;
  column-count:         1;
  }
}

.close {
  position: absolute;
  right: 32px;
  top: 32px;
  width: 32px;
  height: 32px;
  opacity: 0.3;
}
.close:hover {
  opacity: 1;
  cursor: pointer;
}
.close:before, .close:after {
  position: absolute;
  left: 15px;
  content: ' ';
  height: 33px;
  width: 3px;
  background-color: #333;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}

</style>