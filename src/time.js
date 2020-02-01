

/* Esta funcion agrega un text en (x,y) con tiempo inicial startTIme y devuelve
 * el objeto como tal.
 * Se debe llamar con .call para que tenga acceso al this que es la escena, es decir
 * createCountdown.call(this, 30, 30, 150)
 */
export default function createCountdown(x, y, startTime){
  let countdown = this.add.text(x, y, calcTime(startTime));
  this.time.addEvent({
	delay: 1000,
	callbackScope: countdown,
	callback: function() {
	 this.setText(calcTime(--startTime)); 
	},
	loop: true
  })
  return countdown;

}



function calcTime(time){
  let minutes = Math.floor(time / 60);
  let seconds = time - (minutes * 60);
  return `${minutes}:${seconds}`;
}
