var that;
var MovingCubes = function(){
    this.scene = new THREE.Scene();
    that = this;
};

MovingCubes.prototype.init = function(){
    this.createCamera();
    this.createRenderer();

    this.createBoxes();

    this.createFloor();
    this.createLights();

    this.animateBoxes();

    this.render();

};

MovingCubes.prototype.createCamera = function(){
    this.camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -1000, 1000 );
    this.camera.position.x = 100;
    this.camera.position.y = 100;
    this.camera.position.z = 100;
    //this.camera.updateProjectionMatrix();
    this.camera.lookAt(this.scene.position);
};

MovingCubes.prototype.createRenderer = function(){
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.setClearColor( 0xf2f2f2);
    this.renderer.shadowMapEnabled = true;
    this.renderer.shadowMapType = THREE.PCFSoftShadowMap;
    this.renderer.shadowMapSoft = true;
    document.body.appendChild( this.renderer.domElement );
    window.addEventListener('resize', this.onWindowResize, false);
};

MovingCubes.prototype.createBoxes = function(){
    var geometry = new THREE.BoxGeometry( 50, 50, 50 );
    var material = new THREE.MeshLambertMaterial( { color: 0xf2f2f2, shading: THREE.FlatShading});

    this.groupBoxes = new THREE.Object3D();
    this.leftBoxes = new THREE.Object3D();
    this.middleBoxes = new THREE.Object3D();
    this.rightBoxes = new THREE.Object3D();

    //create all the boxes
    for(var i=0;i<9;i++){
        this.boxe = new THREE.Mesh( geometry, material );

        if(i==0 || i ==3 || i==6){
            this.boxe.castShadow = true;
        }

        if(i<3){
            this.leftBoxes.add(this.boxe);
        }
        else if(i>=3 && i<6){
            this.middleBoxes.add(this.boxe);
        }
        else{
            this.rightBoxes.add(this.boxe);
        }
    }

    this.groupBoxes.add(this.leftBoxes);
    this.groupBoxes.add(this.middleBoxes);
    this.groupBoxes.add(this.rightBoxes);

    this.scene.add(this.groupBoxes);
};

MovingCubes.prototype.createFloor = function(){
    var geometry2 = new THREE.PlaneBufferGeometry( 500, 500);
    var material2 = new THREE.MeshBasicMaterial( { color: 0xf2f2f2 } );
    var floor = new THREE.Mesh( geometry2, material2 );
    floor.material.side = THREE.DoubleSide;
    floor.position.y =-180;
    floor.rotation.x = 90*Math.PI/180;
    floor.rotation.y = 0;
    floor.rotation.z = 0;
    floor.doubleSided = true;
    floor.receiveShadow = true;
    this.scene.add(floor);
};

MovingCubes.prototype.createLights = function(){
    //scene.add(new THREE.AmbientLight(0x666666));

    var shadowLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    shadowLight.position.set( 0, 60, 0 );
    shadowLight.castShadow = true;
    shadowLight.shadowDarkness = 0.1;
    //directionalLightshadow.shadowCameraVisible = true;
    shadowLight.shadowCameraFar = 1000;
    this.scene.add(shadowLight);


    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directionalLight.position.set( 10, 40, 50 );
    this.scene.add( directionalLight );
};

MovingCubes.prototype.animateBoxes = function(){

    var tl = new TimelineMax({repeat: -1 ,repeatDelay:0.5});
    tl.to(this.leftBoxes.position, 0.7, {z: 75, ease: Expo.easeOut});
    tl.to(this.rightBoxes.position, 0.7, {z: -75, ease: Expo.easeOut},"=-0.7"); //"=-0.7" permit to synchronise the different animations by advancing the timeline execution

    tl.to(this.leftBoxes.children[1].position, 0.7, {y: 75, ease: Expo.easeOut});
    tl.to(this.leftBoxes.children[2].position, 0.7, {y: 75, ease: Expo.easeOut},"=-0.7");
    tl.to(this.middleBoxes.children[1].position, 0.7, {y: 75, ease: Expo.easeOut},"=-0.7");
    tl.to(this.middleBoxes.children[2].position, 0.7, {y: 75, ease: Expo.easeOut},"=-0.7");
    tl.to(this.rightBoxes.children[1].position, 0.7, {y: 75, ease: Expo.easeOut},"=-0.7");
    tl.to(this.rightBoxes.children[2].position, 0.7, {y: 75, ease: Expo.easeOut},"=-0.7");

    tl.to(this.leftBoxes.children[2].position, 0.7, {y: 150, ease: Expo.easeOut});
    tl.to(this.middleBoxes.children[2].position, 0.7, {y: 150, ease: Expo.easeOut},"=-0.7");
    tl.to(this.rightBoxes.children[2].position, 0.7, {y: 150, ease: Expo.easeOut},"=-0.7");

    tl.to(this.leftBoxes.position, 0.7, {z: 0, ease: Expo.easeOut});
    tl.to(this.rightBoxes.position, 0.7, {z: 0, ease: Expo.easeOut},"=-0.7");

    tl.to(this.leftBoxes.children[1].position, 0.7, {y: 0, ease: Expo.easeOut});
    tl.to(this.leftBoxes.children[2].position, 0.7, {y: 0, ease: Expo.easeOut},"=-0.7");
    tl.to(this.middleBoxes.children[1].position, 0.7, {y: 0, ease: Expo.easeOut},"=-0.7");
    tl.to(this.middleBoxes.children[2].position, 0.7, {y: 0, ease: Expo.easeOut},"=-0.7");
    tl.to(this.rightBoxes.children[1].position, 0.7, {y: 0, ease: Expo.easeOut},"=-0.7");
    tl.to(this.rightBoxes.children[2].position, 0.7, {y: 0, ease: Expo.easeOut},"=-0.7");
    tl.to(this.groupBoxes.rotation, 0.7, {y:-Math.PI, ease: Expo.easeOut},"=-0.7");

};

MovingCubes.prototype.render = function(){
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
};

MovingCubes.prototype.onWindowResize = function(){
    that.camera.left = window.innerWidth / -2;
    that.camera.right = window.innerWidth / 2;
    that.camera.top = window.innerHeight / 2;
    that.camera.bottom = window.innerHeight / -2;

    that.renderer.setSize(window.innerWidth, window.innerHeight);
    that.camera.aspect = window.innerWidth / window.innerHeight;
    that.camera.updateProjectionMatrix();
};

var movingBoxes = new MovingCubes();
movingBoxes.init();


/*
MovingCubes.prototype.displayAxes = function() {
    //Display the axes - usefull for place the elements
    var axes = buildAxes(1000);
    this.scene.add(axes);

    function buildAxes(length) {
        var axes = new THREE.Object3D();

        axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(length, 0, 0), 0xFF0000, false)); // +X
        axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-length, 0, 0), 0xFF0000, true)); // -X
        axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, length, 0), 0x00FF00, false)); // +Y
        axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -length, 0), 0x00FF00, true)); // -Y
        axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, length), 0x0000FF, false)); // +Z
        axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -length), 0x0000FF, true)); // -Z

        return axes;

    }

    function buildAxis(src, dst, colorHex, dashed) {
        var geom = new THREE.Geometry(),
            mat;

        if (dashed) {
            mat = new THREE.LineDashedMaterial({linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3});
        } else {
            mat = new THREE.LineBasicMaterial({linewidth: 3, color: colorHex});
        }

        geom.vertices.push(src.clone());
        geom.vertices.push(dst.clone());
        geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

        var axis = new THREE.Line(geom, mat, THREE.LinePieces);

        return axis;

    }
};*/
//GRID HELPER
/*
 var axes = new THREE.AxisHelper(50);
 axes.position = 0; //or object's position
 this.scene.add(axes);

 var gridXZ = new THREE.GridHelper(100, 10);
 gridXZ.setColors( new THREE.Color(0xFFC0CB), new THREE.Color(0x8f8f8f) );
 gridXZ.position.set(0,0,0 );
 this.scene.add(gridXZ);
 */

