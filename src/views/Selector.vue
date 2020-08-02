<template>
<div>
    <div class="head">
        <h1>Select Breed</h1>
    </div>
     
    <div id="breeds_tiles">
        <div v-on:click="select($event)" class="tile" v-bind:data-breed="breed.name" v-for="breed in breeds" :key="breed.name">
            <div class="caption">{{ breed.name }}</div>
            <div class="item">
                <img class="bg-card-photo" v-bind:src="breed.image"/>
                <div class="blur"></div>
                <img class="card-photo" v-bind:src="breed.image"/>
            </div>
        </div>
    </div>
</div>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'Selector',
    
    data: function() {
        let that = {
            breeds: [],

            select: function(event) {
                let breed_name = event.currentTarget.getAttribute("data-breed");
                this.$router.push({name: "Photos", params: {breed: breed_name} })
            }
        }
        fetch('https://dog.ceo/api/breeds/list/all')
            .then(response => response.json())
            .then(json => {
                let breeds_data = json.message
                let breeds = Object.keys(breeds_data).map(name => ({name: name, image: null, subbreeds: breeds_data[name]}))
                that.breeds = breeds
                that.breeds.forEach(breed => {
                    fetch("https://dog.ceo/api/breed/" + breed.name + "/images/random")
                    .then(response => {
                        response.json()
                        .then(json => {
                            breed.image = json.message
                        }) 
                    });
                })
            })

        return that

    },
    
    // methods: {
    //     select: function(event) {
    //         let breed_name = event.currentTarget.getAttribute("data-breed");
    //         this.$router.push({name: "Photos", params: {breed: breed_name} })
    //     }
    // }
}
</script>

<style scoped>

.head {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 80px;
    background-color: white;
}

#breeds_tiles {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    font-family: sans-serif;
    font-size: 18px;
    margin: 20px;
    margin-top: 100px;
}

div.tile {
    border: 2px solid #D3D3D3;
}

div.tile:hover {
    cursor: pointer;
    border-color: #57595d;
}
    
div.item {
    height: 150px;
    position: relative;
}

.blur {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
}
  
.bg-card-photo {
    width: 100%;
    height: 100%;
}
  
.card-photo {
    max-width: 100%;
    max-height: 100%;
    margin: auto;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
}

.caption {
    display: block;
    padding: 5px;
    text-align: center;
}

</style>