function buildGUI(){
    var gui = new dat.GUI({autoPlace: false});
    
    var objectsMenu = gui.addFolder('Objects: ');
    var object = objectsMenu.addFolder('Torus');
    //dodanie checkboxa
    object.add(mesh, 'visible').name('Visible:').onChange(function(value){
        visibility = true;
    });
    //dodanie pelaty koloru
    var Config = function(){
        this.color = "#ffffff";
    }
    var conf = new Config();
    object.addColor(conf, 'color').name('Color').onChange(function(value){
        value = value.replace('#', '0x');
        mesh.material.color.setHex(value);
    });
    //suwak do kamery
    var CameraZ = function(){
        this.z = 30;
    }
    var cameraZ = new CameraZ();
    object.add(cameraZ, 'z').name('Camera z: ').min(0).max(100).step(1).onChange(function(value){
        camera.position.z = value;
    });
    //transparentność
    var Transparency = function(){
        this.transp = 1;
    }
    var transparency = new Transparency();
    object.add(transparency, 'transp').name('Transparency: ').min(0).max(1).step(0.01).onChange(function(value){
        mesh.material.opacity = value;
    });
    
    var ObjectMaterial = function(){
        this.material = "";
    }
    var objectMaterial = new ObjectMaterial();
    object.add(objectMaterial, 'material', ["Wireframe", "Flat", "Gouraud" ,"Phong"]).name('Material type:').onChange(function(value){
        var color = mesh.material.color;
        var transp = mesh.material.opacity;
        if (value == "Wireframe")
            newMaterial = new THREE.MeshBasicMaterial({
                color,
                transparent: true,
                opacity: transp,
                wireframe: true
            });
        else if (value == "Flat")
            newMaterial = new THREE.MeshPhongMaterial({
                color,
                transparent: true,
                opacity: transp,
                shading: THREE.FlatShading
            });
        else if (value == "Gouraud")
            newMaterial = new THREE.MeshLambertMaterial({
                color,
                transparent: true,
                opacity: transp,
                shading: THREE.SmoothShading
            });
        else 
            newMaterial = new THREE.MeshPhongMaterial({
                color,
                transparent: true,
                opacity: transp,
                shading: THREE.SmoothShading
            });
        mesh.material = newMaterial;    
    });
    //przycisk
    var Button = function(){
        this.buttonFunction = function(){
            alert("ALARM!");
        }     
    }
    var button = new Button();
    object.add(button, "buttonFunction").name("Button");
    
    objectsMenu.open();
    
    var customContainer = document.getElementById('my-gui-container');
    customContainer.appendChild(gui.domElement);
}