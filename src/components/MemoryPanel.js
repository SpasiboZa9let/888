#memory-panel {
  width: 320px;
  max-height: calc(70vw / (16/9));
  background: #fffdf6;
  border: 1px solid #d7cdbb;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  padding: 16px;
  border-radius: 4px;
  overflow: hidden;
  opacity: 0;
  transition: opacity .3s ease;
  font-family: 'Special Elite', serif;
  margin: 0 auto;
  position: relative;
}

#memory-panel.visible {
  opacity: 1;
}

#memory-panel img {
  width: 100%;
  border-radius: 2px;
  filter: sepia(0.1) brightness(0.95) contrast(1.05);
  margin-bottom: 12px;
}

#memory-panel .text {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #3c3a36;
  text-align: center;
  font-style: italic;
}

.memory-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #3c3a36;
  font-size: 1.3rem;
  text-align: center;
  font-family: 'Special Elite', serif;
  pointer-events: none;
  opacity: 0;
  white-space: pre-wrap;
  padding: 10px 20px;
  background: rgba(255, 252, 240, 0.8);
  border-radius: 6px;
  border: 1px solid #d6cbb7;
  max-width: 90%;
  z-index: 10;
}

@media (max-width: 767px) {
  #memory-panel {
    transform: translateY(100%);
    opacity: 0;
    transition: transform 0.4s ease, opacity 0.3s ease;
  }

  #memory-panel.visible {
    transform: translateY(0%);
    opacity: 1;
  }
}
