(function (global) {
    function setShelterBarProgress(clip, fill, pct) {
        if (!clip || !fill) return;
        var progress = Math.max(0.5, Math.min(100, pct));
        clip.style.width = progress.toFixed(1) + '%';
        fill.style.width = (10000 / progress).toFixed(2) + '%';
    }

    global.initShelterSplashBar = function (options) {
        options = options || {};
        var clip = document.getElementById('bar-clip');
        var fill = document.getElementById('bar-fill');
        var start = Date.now();
        var speed = options.speed || 0.045;
        var maxFake = options.maxFake != null ? options.maxFake : 85;

        function setProgress(pct) {
            setShelterBarProgress(clip, fill, pct);
        }

        function tick() {
            var val = Math.min((Date.now() - start) * speed + 2, maxFake);
            setProgress(val);
            if (val < maxFake) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);

        global.setShelterProgress = function (value) {
            setProgress(Math.max(maxFake, Math.min(100, value)));
        };
    };
})(window);
