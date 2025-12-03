import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { CharacterData } from './Character';

interface Enemy {
  id: string;
  name: string;
  type: string;
  hp: number;
  maxHp: number;
  avatar: string;
  color: string;
}

interface BattleArenaProps {
  player: CharacterData;
  onBattleEnd: (victory: boolean) => void;
}

export default function BattleArena({ player, onBattleEnd }: BattleArenaProps) {
  const [enemy, setEnemy] = useState<Enemy>({
    id: 'demon1',
    name: 'Низший демон',
    type: 'Демон',
    hp: 150,
    maxHp: 150,
    avatar: '👹',
    color: '#8B0000',
  });

  const [playerHp, setPlayerHp] = useState(player.hp);
  const [playerMana, setPlayerMana] = useState(player.mana);
  const [comboCount, setComboCount] = useState(0);
  const [battleLog, setBattleLog] = useState<string[]>(['Бой начался!']);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [attackAnimation, setAttackAnimation] = useState(false);
  const [damageAnimation, setDamageAnimation] = useState(false);

  useEffect(() => {
    if (enemy.hp <= 0) {
      setBattleLog(prev => [...prev, `🎉 Победа! ${enemy.name} повержен!`]);
      setTimeout(() => onBattleEnd(true), 2000);
    } else if (playerHp <= 0) {
      setBattleLog(prev => [...prev, '💀 Поражение...']);
      setTimeout(() => onBattleEnd(false), 2000);
    }
  }, [enemy.hp, playerHp, enemy.name, onBattleEnd]);

  const addLog = (message: string) => {
    setBattleLog(prev => [...prev.slice(-4), message]);
  };

  const basicAttack = () => {
    if (!isPlayerTurn) return;

    setAttackAnimation(true);
    setTimeout(() => setAttackAnimation(false), 400);

    const damage = Math.floor(player.attack * (1 + Math.random() * 0.3));
    const newCombo = comboCount + 1;
    setComboCount(newCombo);

    setEnemy(prev => ({ ...prev, hp: Math.max(0, prev.hp - damage) }));
    addLog(`⚔️ Обычная атака! Урон: ${damage} (Комбо x${newCombo})`);

    setPlayerMana(prev => Math.min(player.maxMana, prev + 10));

    setTimeout(() => enemyTurn(), 1000);
    setIsPlayerTurn(false);
  };

  const breathingTechnique = (type: 'water' | 'thunder' | 'flame') => {
    if (!isPlayerTurn || playerMana < 30) return;

    setAttackAnimation(true);
    setTimeout(() => setAttackAnimation(false), 400);

    const techniques = {
      water: { name: 'Дыхание Воды', damage: player.attack * 2, icon: '🌊', color: '#00E5FF' },
      thunder: { name: 'Дыхание Грома', damage: player.attack * 2.5, icon: '⚡', color: '#FFD600' },
      flame: { name: 'Дыхание Пламени', damage: player.attack * 1.8, icon: '🔥', color: '#FF1744' },
    };

    const technique = techniques[type];
    const damage = Math.floor(technique.damage * (1 + comboCount * 0.1));

    setEnemy(prev => ({ ...prev, hp: Math.max(0, prev.hp - damage) }));
    setPlayerMana(prev => prev - 30);
    addLog(`${technique.icon} ${technique.name}! Урон: ${damage}! (Комбо x${comboCount})`);

    setComboCount(comboCount + 2);

    setTimeout(() => enemyTurn(), 1000);
    setIsPlayerTurn(false);
  };

  const enemyTurn = () => {
    setDamageAnimation(true);
    setTimeout(() => setDamageAnimation(false), 300);

    const damage = Math.floor(15 + Math.random() * 20);
    setPlayerHp(prev => Math.max(0, prev - damage));
    addLog(`👹 ${enemy.name} атакует! Урон: ${damage}`);

    setComboCount(0);
    setTimeout(() => setIsPlayerTurn(true), 800);
  };

  const playerHpPercent = (playerHp / player.maxHp) * 100;
  const enemyHpPercent = (enemy.hp / enemy.maxHp) * 100;
  const playerManaPercent = (playerMana / player.maxMana) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-anime-dark to-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className={`p-6 ${damageAnimation ? 'animate-damage' : ''}`}>
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-4xl font-bold"
                style={{ backgroundColor: player.color }}
              >
                {player.avatar}
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-2xl font-bold">{player.name}</h3>
                <p className="text-sm text-muted-foreground">{player.class}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-1">
                    <Icon name="Heart" size={14} className="text-anime-red" />
                    Здоровье
                  </span>
                  <span className="font-bold">
                    {playerHp}/{player.maxHp}
                  </span>
                </div>
                <Progress value={playerHpPercent} className="h-3 bg-muted">
                  <div
                    className="h-full bg-anime-red transition-all duration-300 rounded-full"
                    style={{ width: `${playerHpPercent}%` }}
                  />
                </Progress>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-1">
                    <Icon name="Zap" size={14} className="text-anime-cyan" />
                    Техника
                  </span>
                  <span className="font-bold">
                    {playerMana}/{player.maxMana}
                  </span>
                </div>
                <Progress value={playerManaPercent} className="h-3 bg-muted">
                  <div
                    className="h-full bg-anime-cyan transition-all duration-300 rounded-full"
                    style={{ width: `${playerManaPercent}%` }}
                  />
                </Progress>
              </div>
            </div>

            {comboCount > 0 && (
              <div className="mt-4 text-center">
                <span className="inline-block px-4 py-2 bg-anime-yellow/20 border-2 border-anime-yellow rounded-lg font-bold text-anime-yellow animate-pulse-glow">
                  КОМБО x{comboCount}
                </span>
              </div>
            )}
          </Card>

          <Card className={`p-6 ${attackAnimation ? 'animate-attack' : ''}`}>
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-4xl font-bold"
                style={{ backgroundColor: enemy.color }}
              >
                {enemy.avatar}
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-2xl font-bold">{enemy.name}</h3>
                <p className="text-sm text-muted-foreground">{enemy.type}</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="flex items-center gap-1">
                  <Icon name="Heart" size={14} className="text-anime-red" />
                  Здоровье
                </span>
                <span className="font-bold">
                  {enemy.hp}/{enemy.maxHp}
                </span>
              </div>
              <Progress value={enemyHpPercent} className="h-3 bg-muted">
                <div
                  className="h-full bg-anime-red transition-all duration-300 rounded-full"
                  style={{ width: `${enemyHpPercent}%` }}
                />
              </Progress>
            </div>

            <div className="mt-6 text-center">
              {enemy.hp > 0 ? (
                <span className="text-xl font-bold text-anime-red animate-pulse-glow">
                  ⚠️ ОПАСЕН ⚠️
                </span>
              ) : (
                <span className="text-xl font-bold text-muted-foreground">💀 ПОВЕРЖЕН</span>
              )}
            </div>
          </Card>
        </div>

        <Card className="p-6 mb-6">
          <h3 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
            <Icon name="Swords" size={24} className="text-primary" />
            Техники дыхания
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              onClick={basicAttack}
              disabled={!isPlayerTurn || playerHp <= 0 || enemy.hp <= 0}
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2 hover:bg-anime-red/20 hover:border-anime-red"
            >
              <Icon name="Sword" size={24} className="text-anime-red" />
              <span className="font-bold">Атака</span>
              <span className="text-xs text-muted-foreground">Базовая</span>
            </Button>

            <Button
              onClick={() => breathingTechnique('water')}
              disabled={!isPlayerTurn || playerMana < 30 || playerHp <= 0 || enemy.hp <= 0}
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2 hover:bg-anime-cyan/20 hover:border-anime-cyan"
            >
              <span className="text-2xl">🌊</span>
              <span className="font-bold">Вода</span>
              <span className="text-xs text-muted-foreground">30 маны</span>
            </Button>

            <Button
              onClick={() => breathingTechnique('thunder')}
              disabled={!isPlayerTurn || playerMana < 30 || playerHp <= 0 || enemy.hp <= 0}
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2 hover:bg-anime-yellow/20 hover:border-anime-yellow"
            >
              <span className="text-2xl">⚡</span>
              <span className="font-bold">Гром</span>
              <span className="text-xs text-muted-foreground">30 маны</span>
            </Button>

            <Button
              onClick={() => breathingTechnique('flame')}
              disabled={!isPlayerTurn || playerMana < 30 || playerHp <= 0 || enemy.hp <= 0}
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2 hover:bg-primary/20 hover:border-primary"
            >
              <span className="text-2xl">🔥</span>
              <span className="font-bold">Пламя</span>
              <span className="text-xs text-muted-foreground">30 маны</span>
            </Button>
          </div>
        </Card>

        <Card className="p-4 bg-card/50 backdrop-blur">
          <h4 className="font-bold mb-2 flex items-center gap-2">
            <Icon name="ScrollText" size={16} />
            Лог боя
          </h4>
          <div className="space-y-1 text-sm">
            {battleLog.map((log, i) => (
              <div key={i} className="animate-fade-in text-muted-foreground">
                {log}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
