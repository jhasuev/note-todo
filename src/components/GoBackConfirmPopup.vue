<template>
	<div
		class="popup"
		:class="{'active' : show_popup}"
		>
		<div class="popup__content">
			<div class="popup__content-heading">Вернуться?</div>
			<div class="popup__content-desc">
				Все внесенные изменения будут отменены.
			</div>
			<div class="popup__content-actions">
				<button @click="goBack()" class="popup__content-actions-item  btn  btn--danger">Да, вернуться</button>
				<button @click="closePopup()" class="popup__content-actions-item  btn">Нет, остаться</button>
			</div>
		</div>
	</div>
</template>
<script>
	import mixins from '../mixins'
	import {eventEmitter} from '../main'
	export default {
		mixins : [mixins],
		data(){
			return {
				id : -1,
				title : '',
				show_popup : false
			}
		},
		methods : {
			goBack(){
				this.closePopup();
				eventEmitter.$emit('goBack');
			},
			closePopup(){
				this.show_popup = false
			}
		},
		created(){
			eventEmitter.$on('getReadyBack', (id)=>{
				this.show_popup = true
			})
		}
	}
</script>
<style>

.popup {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 999;
	background-color: rgba(0,0,0,.75);
	padding: 15px;
	display: flex;
	justify-content: center;
	align-items: center;

	opacity: 0;
	visibility: hidden;
	transition: .2s;
}
.popup.active {
	opacity: 1;
	visibility: visible;
}
.popup__content {
	width: 100%;
	max-width: 444px;
	background-color: #fff;
	padding: 15px;
	border-radius: 4px;
	text-align: center;
}
.popup__content-heading {
	font-size: 22px;
}
.popup__content-desc {
	padding-top: 10px;
}
.popup__content-actions {
	padding-top: 10px;
}
.popup__content-actions-item {
	margin: 0 7px;
}

</style>