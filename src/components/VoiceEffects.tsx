import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface VoiceEffect {
  id: string;
  name: string;
  icon: string;
  description: string;
  active: boolean;
}

interface VoiceEffectsProps {
  isVisible: boolean;
  onClose: () => void;
  onApplyEffect: (effect: string) => void;
}

const VoiceEffects = ({ isVisible, onClose, onApplyEffect }: VoiceEffectsProps) => {
  const [effects, setEffects] = useState<VoiceEffect[]>([
    {
      id: 'robot',
      name: 'Робот',
      icon: 'Bot',
      description: 'Механический голос',
      active: false
    },
    {
      id: 'echo',
      name: 'Эхо',
      icon: 'Radio',
      description: 'Эффект эха',
      active: false
    },
    {
      id: 'chipmunk',
      name: 'Бурундук',
      icon: 'Volume2',
      description: 'Высокий тон',
      active: false
    },
    {
      id: 'deep',
      name: 'Глубокий',
      icon: 'VolumeX',
      description: 'Низкий тон',
      active: false
    },
    {
      id: 'whisper',
      name: 'Шёпот',
      icon: 'Volume1',
      description: 'Тихий голос',
      active: false
    },
    {
      id: 'alien',
      name: 'Пришелец',
      icon: 'Zap',
      description: 'Космический звук',
      active: false
    }
  ]);

  const [volume, setVolume] = useState([80]);
  const [speed, setSpeed] = useState([100]);
  const [pitch, setPitch] = useState([100]);

  const toggleEffect = (effectId: string) => {
    setEffects(prev => prev.map(effect => 
      effect.id === effectId 
        ? { ...effect, active: !effect.active }
        : { ...effect, active: false }
    ));
    
    const selectedEffect = effects.find(e => e.id === effectId);
    if (selectedEffect) {
      onApplyEffect(selectedEffect.name);
    }
  };

  if (!isVisible) return null;

  return (
    <Card className="absolute bottom-16 left-4 w-80 p-4 bg-wore-darker border-wore-lighter animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-wore-text-bright">Голосовые эффекты</h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-wore-text-muted hover:text-wore-text-bright">
          <Icon name="X" size={16} />
        </Button>
      </div>

      {/* Effects Grid */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {effects.map((effect) => (
          <Button
            key={effect.id}
            variant="ghost"
            className={`h-16 flex flex-col items-center justify-center space-y-1 ${
              effect.active 
                ? 'bg-wore-accent text-wore-text-bright' 
                : 'bg-wore-lighter text-wore-text hover:bg-wore-lighter/70'
            }`}
            onClick={() => toggleEffect(effect.id)}
          >
            <Icon name={effect.icon} size={20} />
            <span className="text-xs">{effect.name}</span>
          </Button>
        ))}
      </div>

      {/* Audio Controls */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-wore-text">Громкость</span>
            <span className="text-sm text-wore-text-muted">{volume[0]}%</span>
          </div>
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-wore-text">Скорость</span>
            <span className="text-sm text-wore-text-muted">{speed[0]}%</span>
          </div>
          <Slider
            value={speed}
            onValueChange={setSpeed}
            min={50}
            max={200}
            step={5}
            className="w-full"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-wore-text">Тон</span>
            <span className="text-sm text-wore-text-muted">{pitch[0]}%</span>
          </div>
          <Slider
            value={pitch}
            onValueChange={setPitch}
            min={50}
            max={200}
            step={5}
            className="w-full"
          />
        </div>
      </div>

      {/* Preview Button */}
      <div className="mt-4 pt-4 border-t border-wore-lighter">
        <Button className="w-full bg-wore-accent hover:bg-wore-accent-hover text-wore-text-bright">
          <Icon name="Play" size={16} className="mr-2" />
          Предпросмотр
        </Button>
      </div>
    </Card>
  );
};

export default VoiceEffects;