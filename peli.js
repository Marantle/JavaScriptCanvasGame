var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var interval;
var sound1 = new Audio('aani.wav');//audio muuttuja
var sound2 = new Audio('skid.wav');//audio muuttuja
//luodaan ohjattava pallo
var ball = {
	x: 20,
	y: 20,
	r: 15,
	speed: 4
};
//vihollispallo
var enemy = {
	x: 150,
	y: 150,
	r: 15,
	speed: 1
};
//alustetaan pisteet, ohjaussuunnat ja kolikon kuva ja arvotaan sille paikka canvaksessa
var score = 0;
var left = false, right = false, up = false, down = false;
var sprite;
sprite = new Image;
sprite.src = './coin.png';
var coin = {
	srcX: 0,
	srcY: 0,
	w: 100,
	h: 90,
	dw: 50,
	dh: 50,
	x: Math.floor(Math.random() * 350),
	y: Math.floor(Math.random() * 150)
	};
	//kolikon animaatiomuuttuja
var delay = 0;
//hidaste kolikon animaatiolle
var hidaste = 0;
document.addEventListener('keydown', keyDown, false);
document.addEventListener('keyup', keyUp, false);
//oman pallon, vihollispallon ja kolikon reunojmuuttujien teko
var oikea, vasen, yla, ala, coikea, cvasen, cyla, cala, eoikea, evasen, eyla, eala;

//itse pääfunktio joka pyörittää kaiken
function loop()
{
clearCanvas();
draw();
drawCoin();
coinCollision();
drawScore();
difficulty();
drawEnemy();
enemyCollision();
}

//vihollisen nopeus kasvaa kun kerää kolikoita
function difficulty()
{
if (score == 15)
enemy.speed = 2;
}

//törmäysfunktio ja samalla pelin lopettava funktio jos törmää vihollispalloon
function enemyCollision()
{
//pallon reunat
oikea = ball.x + ball.r;
vasen = ball.x - ball.r;
ala = ball.y + ball.r;
yla = ball.y - ball.r;
//vihollispallon reunat
eoikea = enemy.x + enemy.r;
evasen = enemy.x - enemy.r;
eala = enemy.y + enemy.r;
eyla = enemy.y - enemy.r;

if ((ala > eyla && yla < eala) && (oikea > evasen && vasen < eoikea)){
sound2.play();
var valinta = confirm("Hävisit, keräsit " + score + " kolikkoa, pelataanko uudestaan?");
//talletetetaan pisteet selaimen muistiin jos tulos on parempi kuin vanha
if (localStorage.pisteet < score || localStorage.pisteet == undefined)
  {
  localStorage.pisteet=score;
  }
//confirm boxi kysyy mitä tehdään, kyllä reloadaa ei tyhjää sivun ja näyttää pisteet
if (valinta)
{
location.reload(true);
}
//keskeytetään loop
clearInterval(interval);
document.getElementById('peli').innerHTML = "Peli ohi, keräsit " + score + " kolikkoa";
}
}
//vihollispallon piirtäminen, lähestyy aina pelaajapallon sijaintia molemmissa koordinaateissa joka loopilla
function drawEnemy()
{
if (enemy.x - enemy.r < 1){
left = false;
} else if (enemy.x + enemy.r >= canvas.width){
right = false;
}
if (enemy.y - enemy.r < 1){
up = false;
} else if (enemy.y+enemy.r >= canvas.height) {
down = false;
}
if (ball.x < enemy.x) {
enemy.x -= enemy.speed;
}
if (ball.x > enemy.x) {
enemy.x += enemy.speed;
}
if (ball.y < enemy.y) {
enemy.y -= enemy.speed;
}
if (ball.y > enemy.y) {
enemy.y += enemy.speed;
}
//itse pallo ja sen väritys
ctx.fillStyle = "red";
ctx.beginPath();
ctx.arc(enemy.x, enemy.y, enemy.r, 0, Math.PI * 2, true);
ctx.closePath();
ctx.fill();
}

//päivitetään alakulmassa näkyvä pistelukema joka loopilla
function drawScore()
{
ctx.strokeStyle = "blue";
ctx.font = "20px Arial";
ctx.strokeText(score + " coins", 2, 198);
}

//törmäysehdot kolikon kanssa
function coinCollision()
{
//pallon reunat
oikea = ball.x + ball.r;
vasen = ball.x - ball.r;
ala = ball.y + ball.r;
yla = ball.y - ball.r;
//kolikon reunat
coikea = coin.x + coin.w/2;
cvasen = coin.x;
cala = coin.y + coin.h/2+5;
cyla =  coin.y;
//törmäysehto, jos mikään reunat on kolikon reunojen sisällä niin arvotaan uusi kolikon sijainti ja lisätään yksi piste sekä soitetaan ääni
if ((ala > cyla && yla < cala) && (oikea > cvasen && vasen < coikea))
{
	sound1.play();
	score++;
	coin.x = Math.floor(Math.random() * 350);
	coin.y = Math.floor(Math.random() * 150);
}
}
//canvaksen tyhjäys
function clearCanvas()
{
ctx.clearRect(0,0, canvas.width, canvas.height);
}

function drawCoin() {
//lisätään että vain joka viidennellä loopilla kolikko "kierähtää" jottei se pyöri liian kovaa
if (hidaste == 5)
{
//itse kolikon animointi, joka viidennen loopin jälkeen siirrytään 100pixeliä oikealle kuvatiedostossa ja otetaan siit 100x90 alue ja piirretään se
if (delay == 0) {
coin.srcX = 0;
}else if (delay == 1) {
coin.srcX = 100;
}else if (delay == 2) {
coin.srcX = 200;
}else if (delay == 3) {
coin.srcX = 300;
}else if (delay == 4) {
coin.srcX = 400;
}else if (delay == 5) {
coin.srcX = 500;
}else if (delay == 6) {
coin.srcX = 600;
}else if (delay == 7) {
coin.srcX = 700;
}else if (delay == 8) {
coin.srcX = 800;
}else if (delay == 9) {
coin.srcX = 900;
}else if (delay == 10) {
coin.srcX = 1000;
}else if (delay == 11) {
coin.srcX = 1100;
delay = 0;
}
hidaste = 0;
delay++;
}
hidaste++;
// w ja h on kuvatiedostossa mikä pala kuvaa otetaan
ctx.drawImage(sprite, coin.srcX, coin.srcY, coin.w, coin.h, coin.x, coin.y, coin.dw, coin.dh);
}

//piirretään pelaajapallo
function draw()
{
//jos pallon mikään reuna ylittää minkää canvaksen reunan, pysäytetään siihen suuntaan ohjaava liikemuuttuja asettamalla se epätodeksi
if (ball.x - ball.r < 1){
left = false;
ball.x = 1 + ball.r;
} else if (ball.x + ball.r > canvas.width){
right = false;
ball.x = canvas.width - ball.r;
}
if (ball.y - ball.r < 1){
up = false;
ball.y = ball.r + 1;
} else if (ball.y + ball.r >= canvas.height) {
down = false;
ball.y = canvas.height - ball.r;
}
if (left) {
ball.x -= ball.speed;
}
if (right) {
ball.x += ball.speed;
}
if (up) {
ball.y -= ball.speed;
}
if (down) {
ball.y += ball.speed;
}
//itse pallo ja sen väri
ctx.fillStyle = "green";
ctx.beginPath();
ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2, true);
ctx.closePath();
ctx.fill();
}

//kun nappi painetaan alas, tarkastellaan mikä nappi se on ja asetetaan kyseinen muuttuja todeksi
function keyDown(e) 
{
console.log("down: " + e.keyCode);
if (e.keyCode == 37){
//left
left = true;
} else if (e.keyCode == 38) {
//up
up = true;
} else if (e.keyCode == 39) {
//right
right = true;
} else if (e.keyCode == 40) {
//down
down = true;
}
}

//kun nappi nostetaan, asetetaan kyseinen muuttuja epätodeksi
function keyUp(e)
{
console.log("up: " + e.keyCode);
if (e.keyCode == 37){
//left
left = false;
} else if (e.keyCode == 38) {
//up
up = false;
} else if (e.keyCode == 39) {
//right
right = false;
} else if (e.keyCode == 40) {
//down
down = false;
}
}

//functio ennätyspistemäärän piirtämiseen ja alotus lähtölaskentaa varten
function aloita()
{
//jos ei ole pisteitä selaimen muistissa
if (localStorage.pisteet == undefined)
document.getElementById('record').innerHTML = "Ei parasta tulosta tallessa";
//jos on pistetiä selaimen muistissa
else
document.getElementById('record').innerHTML = "Paras tuloksesi on: " + localStorage.pisteet + " kolikkoa";
document.getElementById('aloita').innerHTML = "";
ctx.strokeStyle = "red";
ctx.font = "60px Comic Sans";
//lähtölaskenta
setTimeout("ctx.strokeText(3, 175, 125)", 0);
setTimeout("clearCanvas();", 500);
setTimeout("ctx.strokeText(2, 175, 125)", 500);
setTimeout("clearCanvas();", 1000);
setTimeout("ctx.strokeText(1, 175, 125)", 1000);
setTimeout("clearCanvas();", 1500);
//peli lähtee käyntiin
setTimeout("interval = setInterval('loop()', 20)", 1500);
}