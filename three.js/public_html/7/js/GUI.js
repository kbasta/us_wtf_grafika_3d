function buildGUI(){
    var gui = new dat.GUI({autoPlace: false});
    
    var objectsMenu = gui.addFolder('Objects: ');
    
    //suwak do kamery
    var CameraZ = function(){
        this.z = 10;
    }
    var cameraZ = new CameraZ();
    objectsMenu.add(cameraZ, 'z').name('Camera z: ').min(0).max(50).step(1).onChange(function(value){
        camera.position.z = value;
    });
    
    var object1 = objectsMenu.addFolder('Car1');
    var object2 = objectsMenu.addFolder('Car2');
    
    if (mesh1){
    //dodanie checkboxa
    object1.add(mesh1, 'visible').name('Visible:').onChange(function(value){
        visibility = true;
    });
    //dodanie pelaty koloru
    var Config = function(){
        this.color = "#ffffff";
    }
    var conf = new Config();
    object1.addColor(conf, 'color').name('Color').onChange(function(value){
        value = value.replace('#', '0x');
        for (var i = 0; i < mesh1.children.length; i++){
            mesh1.children[i].material.color.setHex(value);
        }    
    });
    
    //transparentność
    var Transparency = function(){
        this.transp = 1;
    }
    var transparency = new Transparency();
    object1.add(transparency, 'transp').name('Transparency: ').min(0).max(1).step(0.01).onChange(function(value){
        for (var i = 0; i < mesh1.children.length; i++){
            mesh1.children[i].material.opacity = value;
        }
    });
    
    var ObjectMaterial = function(){
        this.material = "";
    }
    var objectMaterial = new ObjectMaterial();
    object1.add(objectMaterial, 'material', ["Wireframe", "Flat", "Gouraud" ,"Phong"]).name('Material type:').onChange(function(value){
        for (var i = 0; i < mesh1.children.length; i++){
            var color = mesh1.children[i].material.color;
            var transp = mesh1.children[i].material.opacity;
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
            mesh1.children[i].material = newMaterial;
        }
    });
    }
    //przycisk
    var Button = function(){
        this.buttonFunction = function(){
            alert("Kamil Basta");
        }     
    }
    var button = new Button();
    objectsMenu.add(button, "buttonFunction").name("Author");
    
    //**********************
    if (mesh2){
    object2.add(mesh2, 'visible').name('Visible:').onChange(function(value){
        visibility = true;
    });
    //dodanie pelaty koloru
    var Config = function(){
        this.color = "#ffffff";
    }
    var conf = new Config();
    object2.addColor(conf, 'color').name('Color').onChange(function(value){
        value = value.replace('#', '0x');
        for (var i = 0; i < mesh2.children.length; i++){
            mesh2.children[i].material.color.setHex(value);
        }    
    });
   
    //transparentność
    var Transparency = function(){
        this.transp = 1;
    }
    var transparency = new Transparency();
    object2.add(transparency, 'transp').name('Transparency: ').min(0).max(1).step(0.01).onChange(function(value){
        for (var i = 0; i < mesh2.children.length; i++){
            mesh2.children[i].material.opacity = value;
        }
    });
    
    var ObjectMaterial1 = function(){
        this.material = "";
    }
    var objectMaterial1 = new ObjectMaterial1();
    object2.add(objectMaterial1, 'material', ["Wireframe", "Flat", "Gouraud" ,"Phong"]).name('Material type:').onChange(function(value){
        for (var i = 0; i < mesh2.children.length; i++){
            var color = mesh2.children[i].material.color;
            var transp = mesh2.children[i].material.opacity;
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
            mesh2.children[i].material = newMaterial;
        }
    });
    }
    objectsMenu.open();
    
    var customContainer = document.getElementById('my-gui-container');
    customContainer.appendChild(gui.domElement);
}