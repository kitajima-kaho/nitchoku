<template>
	<main>
        <div class="main_wrap">
            <slot></slot>
        </div>
    </main>
</template>
<style lang="scss">
main {
    width: 100%;
    background-color: #FCF4EC;

    .main_wrap {
        margin-right: auto;
        margin-left: auto;
        max-width: 925px;
        display: flex;


        .media {
            margin-top: 20px;
            width: 620px;
            display: block;

            .main_title {
                text-align: center;
                margin-bottom: 15px;
            }
        }
    }
}


</style>