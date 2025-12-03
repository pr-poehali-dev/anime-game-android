import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export interface CharacterData {
  id: string;
  name: string;
  class: string;
  avatar: string;
  hp: number;
  maxHp: number;
  mana: number;
  maxMana: number;
  attack: number;
  defense: number;
  speed: number;
  color: string;
}

interface CharacterProps {
  character: CharacterData;
  isSelected?: boolean;
  onSelect?: () => void;
  showStats?: boolean;
}

export default function Character({ character, isSelected, onSelect, showStats = true }: CharacterProps) {
  const hpPercentage = (character.hp / character.maxHp) * 100;
  const manaPercentage = (character.mana / character.maxMana) * 100;

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-300 cursor-pointer hover:scale-105 ${
        isSelected ? 'ring-4 ring-primary shadow-2xl' : ''
      }`}
      onClick={onSelect}
      style={{
        background: `linear-gradient(135deg, ${character.color}20, ${character.color}05)`,
        borderColor: isSelected ? character.color : undefined,
      }}
    >
      <div className="p-4">
        <div className="flex items-center gap-4 mb-3">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold animate-pulse-glow"
            style={{ backgroundColor: character.color }}
          >
            {character.avatar}
          </div>
          <div className="flex-1">
            <h3 className="font-heading text-xl font-bold">{character.name}</h3>
            <p className="text-sm text-muted-foreground">{character.class}</p>
          </div>
        </div>

        {showStats && (
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="flex items-center gap-1">
                  <Icon name="Heart" size={12} className="text-anime-red" />
                  HP
                </span>
                <span>
                  {character.hp}/{character.maxHp}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-anime-red transition-all duration-300"
                  style={{ width: `${hpPercentage}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="flex items-center gap-1">
                  <Icon name="Zap" size={12} className="text-anime-cyan" />
                  MANA
                </span>
                <span>
                  {character.mana}/{character.maxMana}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-anime-cyan transition-all duration-300"
                  style={{ width: `${manaPercentage}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-border/50">
              <div className="text-center">
                <Icon name="Sword" size={14} className="mx-auto mb-1 text-anime-red" />
                <div className="text-xs font-bold">{character.attack}</div>
                <div className="text-xs text-muted-foreground">ATK</div>
              </div>
              <div className="text-center">
                <Icon name="Shield" size={14} className="mx-auto mb-1 text-anime-purple" />
                <div className="text-xs font-bold">{character.defense}</div>
                <div className="text-xs text-muted-foreground">DEF</div>
              </div>
              <div className="text-center">
                <Icon name="Gauge" size={14} className="mx-auto mb-1 text-anime-yellow" />
                <div className="text-xs font-bold">{character.speed}</div>
                <div className="text-xs text-muted-foreground">SPD</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}