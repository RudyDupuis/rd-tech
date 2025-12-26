<template>
  <div>
    <ToolsboxBackSvg class="toolsbox-back" />
    <ToolsboxMiddleSvg class="toolsbox-middle" />
    <HammerSvg class="hammer" />
    <SawSvg class="saw" />
    <ScrewdriverSvg class="screwdriver" />
    <SpannerSvg class="spanner" />
    <TapeMeasureSvg class="tape-measure" />
    <ToolsboxFrontSvg class="toolsbox-front" />
  </div>
</template>

<style scoped>
div {
  width: 350px;
  height: 266px;
  position: relative;
  animation: falling-tools-box-normal-size 1s ease-in forwards;
}

@media (max-width: 1100px) {
  div {
    animation: falling-tools-box-medium-size 1s ease-in forwards;
  }
}

@media (max-width: 500px) {
  div {
    animation: falling-tools-box-little-size 1s ease-in forwards;
  }
}

@keyframes falling-tools-box-normal-size {
  0% {
    transform: translateY(-200%);
  }
  30% {
    transform: translateY(-200%);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes falling-tools-box-medium-size {
  0% {
    transform: translateY(-200%) scale(0.8);
  }
  100% {
    transform: translateY(0) scale(0.8);
  }
}

@keyframes falling-tools-box-little-size {
  0% {
    transform: translateY(-200%) scale(0.6);
  }
  100% {
    transform: translateY(0) scale(0.6);
  }
}

svg {
  position: absolute;
}

.toolsbox-back,
.toolsbox-front,
.toolsbox-middle {
  animation: falling-box 0.2s ease-in 1s forwards;
}
@keyframes falling-box {
  0% {
    transform: rotate(5deg);
  }

  100% {
    transform: rotate(0deg);
  }
}

.hammer {
  top: 60px;
  left: 115px;
  transform: rotate(-30deg);
  animation: falling-tools-hammer 1s ease-in-out 1s forwards;
}
@keyframes falling-tools-hammer {
  0% {
    transform: translateY(10px) rotate(-35deg);
  }

  50% {
    transform: translateY(-150px) rotate(-25deg);
  }

  100% {
    transform: translateY(0) rotate(-30deg);
  }
}

.saw {
  top: 110px;
  left: 20px;
  transform: rotate(-45deg);
  animation: falling-tools-saw 1s ease-in-out 1s forwards;
}
@keyframes falling-tools-saw {
  0% {
    transform: translateY(10px) rotate(-50deg);
  }

  50% {
    transform: translateY(-120px) rotate(-40deg);
  }

  100% {
    transform: translateY(0) rotate(-45deg);
  }
}
.screwdriver {
  top: 145px;
  left: 98px;
  transform: rotate(315deg);
  animation: falling-tools-screwdriver 1s ease-in-out 1s forwards;
}
@keyframes falling-tools-screwdriver {
  0% {
    transform: translateY(10px) rotate(310deg);
  }

  50% {
    transform: translateY(-200px) rotate(320deg);
  }

  100% {
    transform: translateY(0) rotate(315deg);
  }
}

.spanner {
  top: 128px;
  left: 1px;
  transform: rotate(40deg);
  animation: falling-tools-spanner 1s ease-in-out 1s forwards;
}
@keyframes falling-tools-spanner {
  0% {
    transform: translateY(10px) rotate(45deg);
  }

  50% {
    transform: translateY(-80px) rotate(35deg);
  }

  100% {
    transform: translateY(0) rotate(40deg);
  }
}

.tape-measure {
  top: 90px;
  left: 205px;
  transform: rotate(261deg);
  animation: falling-tools-tape-measure 1s ease-in-out 1s forwards;
}
@keyframes falling-tools-tape-measure {
  0% {
    transform: translateY(10) rotate(256deg);
  }

  50% {
    transform: translateY(-100px) rotate(266deg);
  }

  100% {
    transform: translateY(0) rotate(261deg);
  }
}
</style>
