import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LessonTree } from './LessonTree';
import { Exercise } from './Exercise';

const Container = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 100vh;
  background: #FFF;
`;

const Sidebar = styled.div`
  background: #235390;
  padding: 20px;
  color: white;
`;

const MainContent = styled.div`
  padding: 20px;
  overflow-y: auto;
`;

const UserStats = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
`;

const StatItem = styled.div`
  text-align: center;

  .value {
    font-size: 24px;
    font-weight: bold;
    color: #FFD900;
  }

  .label {
    font-size: 12px;
    opacity: 0.8;
  }
`;

const StreakFlame = styled.div<{ $active: boolean }>`
  width: 32px;
  height: 32px;
  color: ${props => props.$active ? '#FF9600' : '#E5E5E5'};
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

const GemCounter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #1CB0F6;
  border-radius: 20px;
  font-weight: bold;

  .gem-icon {
    width: 20px;
    height: 20px;
    color: #FFD900;
  }
`;

const DailyQuest = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;

  .title {
    font-weight: bold;
    margin-bottom: 8px;
  }

  .progress-bar {
    height: 8px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    overflow: hidden;

    .fill {
      height: 100%;
      background: #58CC02;
      width: var(--progress);
      transition: width 0.3s;
    }
  }
`;

const FriendActivity = styled.div`
  margin-top: 24px;

  .title {
    font-weight: bold;
    margin-bottom: 12px;
  }
`;

const FriendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #1CB0F6;
  }

  .info {
    flex: 1;

    .name {
      font-weight: bold;
    }

    .activity {
      font-size: 12px;
      opacity: 0.8;
    }
  }

  .xp {
    color: #FFD900;
    font-weight: bold;
  }
`;

const LeaderboardTab = styled.div`
  margin-top: 24px;
  
  .title {
    font-weight: bold;
    margin-bottom: 12px;
  }

  .tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
  }
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  background: ${props => props.$active ? '#1CB0F6' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${props => props.$active ? '#1CB0F6' : 'rgba(255, 255, 255, 0.2)'};
  }
`;

interface UserProgress {
  xp: number;
  streak: number;
  gems: number;
  hearts: number;
  dailyGoal: number;
  dailyProgress: number;
}

interface Friend {
  id: string;
  name: string;
  avatar: string;
  activity: string;
  xp: number;
}

export const LearningHub: React.FC = () => {
  const [userProgress, setUserProgress] = useState<UserProgress>({
    xp: 1240,
    streak: 7,
    gems: 450,
    hearts: 5,
    dailyGoal: 20,
    dailyProgress: 15
  });

  const [friends] = useState<Friend[]>([
    {
      id: '1',
      name: 'Alice',
      avatar: '/avatars/alice.png',
      activity: 'Completed Functions Unit',
      xp: 50
    },
    {
      id: '2',
      name: 'Bob',
      avatar: '/avatars/bob.png',
      activity: 'Started Classes Section',
      xp: 30
    }
  ]);

  const [activeLeaderboard, setActiveLeaderboard] = useState<'friends' | 'global'>('friends');
  const [currentExercise, setCurrentExercise] = useState<any>(null);

  const handleExerciseComplete = (correct: boolean) => {
    if (correct) {
      setUserProgress(prev => ({
        ...prev,
        xp: prev.xp + 10,
        dailyProgress: prev.dailyProgress + 1
      }));
    } else {
      setUserProgress(prev => ({
        ...prev,
        hearts: prev.hearts - 1
      }));
    }
    setCurrentExercise(null);
  };

  return (
    <Container>
      <Sidebar>
        <UserStats>
          <StatItem>
            <div className="value">{userProgress.xp}</div>
            <div className="label">XP</div>
          </StatItem>
          <StatItem>
            <StreakFlame $active={true} />
            <div className="value">{userProgress.streak}</div>
            <div className="label">Day Streak</div>
          </StatItem>
          <GemCounter>
            <div className="gem-icon">💎</div>
            {userProgress.gems}
          </GemCounter>
        </UserStats>

        <DailyQuest>
          <div className="title">Daily Goal</div>
          <div className="progress-bar">
            <div 
              className="fill" 
              style={{ '--progress': `${(userProgress.dailyProgress / userProgress.dailyGoal) * 100}%` } as any}
            />
          </div>
          <div>{userProgress.dailyProgress}/{userProgress.dailyGoal} minutes</div>
        </DailyQuest>

        <FriendActivity>
          <div className="title">Friend Activity</div>
          {friends.map(friend => (
            <FriendItem key={friend.id}>
              <div className="avatar" />
              <div className="info">
                <div className="name">{friend.name}</div>
                <div className="activity">{friend.activity}</div>
              </div>
              <div className="xp">+{friend.xp} XP</div>
            </FriendItem>
          ))}
        </FriendActivity>

        <LeaderboardTab>
          <div className="title">Leaderboard</div>
          <div className="tabs">
            <Tab
              $active={activeLeaderboard === 'friends'}
              onClick={() => setActiveLeaderboard('friends')}
            >
              Friends
            </Tab>
            <Tab
              $active={activeLeaderboard === 'global'}
              onClick={() => setActiveLeaderboard('global')}
            >
              Global
            </Tab>
          </div>
        </LeaderboardTab>
      </Sidebar>

      <MainContent>
        {currentExercise ? (
          <Exercise
            exercise={currentExercise}
            onComplete={handleExerciseComplete}
            hearts={userProgress.hearts}
            onHeartLost={() => setUserProgress(prev => ({ ...prev, hearts: prev.hearts - 1 }))}
          />
        ) : (
          <LessonTree
            nodes={[
              {
                id: 'basics_1',
                title: 'Basics',
                status: 'completed',
                position: { x: 100, y: 100 },
                connections: ['basics_2'],
                xp: 30,
                skillLevel: 3
              },
              {
                id: 'basics_2',
                title: 'Basics II',
                status: 'available',
                position: { x: 200, y: 200 },
                connections: ['functions_1'],
                xp: 40,
                skillLevel: 0
              },
              {
                id: 'functions_1',
                title: 'Functions',
                status: 'locked',
                position: { x: 300, y: 300 },
                connections: [],
                xp: 50,
                skillLevel: 0
              }
            ]}
            onNodeClick={(nodeId) => {
              // Start lesson
              setCurrentExercise({
                type: 'multipleChoice',
                prompt: 'Convert this JavaScript print statement to Python',
                sourceCode: 'console.log("Hello World");',
                options: [
                  'print("Hello World")',
                  'System.out.println("Hello World")',
                  'echo("Hello World")',
                  'printf("Hello World")'
                ],
                correctAnswer: 'print("Hello World")',
                timeLimit: 30,
                xpReward: 10
              });
            }}
          />
        )}
      </MainContent>
    </Container>
  );
};
