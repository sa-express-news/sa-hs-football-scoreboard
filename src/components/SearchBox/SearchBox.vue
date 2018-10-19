<template>
    <div class="search-box">
        <label for="search">Search for a team by school name</label>
        <div>
            <input class="search" type="text" @keyup="$emit('filter-teams', $event.target.value)" placeholder="E.g. San Antonio Southwest">
            <button class="search"><i class="fas fa-search"></i></button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'search-box',
}
</script>

<style lang="scss">
@import '~express-news-styleguide/init-base';
@import '../../styles/base.scss';


.search-box {
    margin: 0 0 .625em;

    label {
        display: inline-block;
        font-size: 1.1em;
        font-weight: 700;
        margin: 0 0 .357142857em;
        color: $en-black;
    }

    div {
        position: relative;
        width: 100%;

        @include mediaquery($default-tablet) {
            max-width: 50%;
        }

        input {
            display: inline-block;
            box-sizing: border-box;
            padding: .3125em .625em;
            width: 100%;

            &::placeholder {
                color: $light-grey;
            }

            @include mediaquery($default-mobile, 'max-width') {
                border-color: rgba(204,204,204,0.3);
            }
        }

        button {
            display: inline-block;
            padding: .43em .625em;
            right: 0;
            top: 0;
            width: 10%;
            background-color: $grey;
            border: none;
            color: white;
            text-align: center;
            text-decoration: none;
            font-size: 16px;
            position: absolute;
        }
    }
}
</style>