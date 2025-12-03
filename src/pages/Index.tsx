import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Character, { CharacterData } from '@/components/Character';
import BattleArena from '@/components/BattleArena';
import Icon from '@/components/ui/icon';

type GameScreen = 'menu' | 'select' | 'battle';

const characters: CharacterData[] = [
  {
    id: 'tanjiro',
    name: 'Танджиро',
    class: 'Дыхание Воды',
    avatar: '🗡️',
    hp: 180,
    maxHp: 180,
    mana: 100,
    maxMana: 100,
    attack: 45,
    defense: 35,
    speed: 60,
    color: '#00E5FF',
  },
  {
    id: 'zenitsu',
    name: 'Зенитсу',
    class: 'Дыхание Грома',
    avatar: '⚡',
    hp: 140,
    maxHp: 140,
    mana: 120,
    maxMana: 120,
    attack: 65,
    defense: 25,
    speed: 95,
    color: '#FFD600',
  },
  {
    id: 'inosuke',
    name: 'Иноске',
    class: 'Дыхание Зверя',
    avatar: '🐗',
    hp: 200,
    maxHp: 200,
    mana: 80,
    maxMana: 80,
    attack: 55,
    defense: 45,
    speed: 70,
    color: '#9b87f5',
  },
];

const Index = () => {
  const [screen, setScreen] = useState<GameScreen>('menu');
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterData | null>(null);

  const handleSelectCharacter = (character: CharacterData) => {
    setSelectedCharacter(character);
  };

  const startBattle = () => {
    if (selectedCharacter) {
      setScreen('battle');
    }
  };

  const handleBattleEnd = () => {
    setTimeout(() => {
      setScreen('menu');
      setSelectedCharacter(null);
    }, 500);
  };

  if (screen === 'battle' && selectedCharacter) {
    return <BattleArena player={selectedCharacter} onBattleEnd={handleBattleEnd} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-anime-dark to-background">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAxMmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzllODdmNSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {screen === 'menu' && (
          <div className="min-h-screen flex items-center justify-center animate-fade-in">
            <Card className="max-w-md w-full p-8 text-center bg-card/95 backdrop-blur">
              <div className="mb-8">
                <h1 className="font-heading text-5xl font-bold mb-2 bg-gradient-to-r from-anime-red via-anime-purple to-anime-cyan bg-clip-text text-transparent">
                  鬼滅の刃
                </h1>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                  Клинок, рассекающий демонов
                </h2>
                <p className="text-muted-foreground">
                  Овладей техниками дыхания и уничтожь демонов
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={() => setScreen('select')}
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-anime-red to-anime-purple hover:opacity-90"
                >
                  <Icon name="Swords" size={24} className="mr-2" />
                  Начать игру
                </Button>

                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border/50">
                  <div className="text-center">
                    <div className="text-3xl mb-1">🗡️</div>
                    <div className="text-xs text-muted-foreground">Мастерство</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-1">👹</div>
                    <div className="text-xs text-muted-foreground">Демоны</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-1">⚡</div>
                    <div className="text-xs text-muted-foreground">Дыхание</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {screen === 'select' && (
          <div className="max-w-5xl mx-auto animate-scale-in">
            <div className="text-center mb-8">
              <Button
                variant="ghost"
                onClick={() => setScreen('menu')}
                className="mb-4"
              >
                <Icon name="ArrowLeft" size={20} className="mr-2" />
                Назад
              </Button>
              <h2 className="font-heading text-4xl font-bold mb-2">Выбери истребителя демонов</h2>
              <p className="text-muted-foreground">Каждый владеет уникальной техникой дыхания</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {characters.map(character => (
                <div key={character.id} className="animate-fade-in">
                  <Character
                    character={character}
                    isSelected={selectedCharacter?.id === character.id}
                    onSelect={() => handleSelectCharacter(character)}
                    showStats={true}
                  />
                </div>
              ))}
            </div>

            {selectedCharacter && (
              <div className="text-center animate-scale-in">
                <Card className="inline-block p-6 bg-card/95 backdrop-blur">
                  <p className="text-sm text-muted-foreground mb-4">
                    Выбран: <span className="font-bold text-foreground">{selectedCharacter.name}</span>
                  </p>
                  <Button
                    onClick={startBattle}
                    size="lg"
                    className="bg-gradient-to-r from-anime-red to-anime-purple hover:opacity-90 font-bold"
                  >
                    <Icon name="Swords" size={20} className="mr-2" />
                    В бой против демонов!
                  </Button>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;