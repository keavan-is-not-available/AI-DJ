LWX = 0
LWY = 0
RWX = 0
RWY = 0
LWS = 0
RWS = 0

music = ""
function preload() {
    music = loadSound("music.mp3")
}
function setup() {
    canvas = createCanvas(600, 500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotPoses)
}

function modelLoaded() {
    console.log("modelLoaded")
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results)
        LWX = results[0].pose.leftWrist.x
        LWY = results[0].pose.leftWrist.y
        RWX = results[0].pose.rightWrist.x
        RWY = results[0].pose.rightWrist.y
        LWS = results[0].pose.keypoints[9].score
        RWS = results[0].pose.keypoints[10].score
        console.log("x value is " + LWX + "," + RWX + ",y value is " + LWY + "," + RWY)
    }


}


function draw() {
    image(video, 0, 0, 600, 500)
    fill("red")
    stroke("red")

    if (LWS > 0.2) {
        circle(LWX, LWY, 20)
        LWYN = Number(LWY)
        noD = floor(LWYN)
        volume = noD / 500
        document.getElementById("volume_label").innerHTML = "Volume:" + volume.toFixed(2)
        music.setVolume(volume)
    }

    if (RWS > 0.2) {
        circle(RWX, RWY, 20)
        if (RWY > 0 && RWY <= 100) {
            document.getElementById("speed_label").innerHTML = "Speed:0.5X"
            music.rate(0.5)
        }
        else if(RWY > 100 && RWY <= 200){
            document.getElementById("speed_label").innerHTML = "Speed:1.0X"
            music.rate(1)
        }
        else if(RWY > 200 && RWY <= 300){
            document.getElementById("speed_label").innerHTML = "Speed:1.5X"
            music.rate(1.5)
        }
        else if(RWY > 300 && RWY <= 400){
            document.getElementById("speed_label").innerHTML = "Speed:2.0X"
            music.rate(2)
        }
        else if(RWY > 400 && RWY <= 500){
            document.getElementById("speed_label").innerHTML = "Speed:2.5X"
            music.rate(2.5)
        }
}
}
function play1() {
    music.play()    
    music.rate(1)
    music.setVolume(1)
}
