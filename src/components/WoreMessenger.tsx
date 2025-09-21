import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import VoiceEffects from '@/components/VoiceEffects';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  online: boolean;
  type: 'direct' | 'group' | 'channel';
}

interface Message {
  id: string;
  sender: string;
  content: string;
  time: string;
  type: 'text' | 'voice';
  isOwn: boolean;
  duration?: string;
  voiceEffect?: string;
}

const WoreMessenger = () => {
  const [selectedChat, setSelectedChat] = useState<string>('1');
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showVoiceEffects, setShowVoiceEffects] = useState(false);
  const [currentVoiceEffect, setCurrentVoiceEffect] = useState<string>('');

  const chats: Chat[] = [
    {
      id: '1',
      name: 'Анна Петрова',
      lastMessage: 'Как дела? 😊',
      time: '14:32',
      unread: 2,
      avatar: 'AP',
      online: true,
      type: 'direct'
    },
    {
      id: '2',
      name: 'Рабочая группа',
      lastMessage: 'Собрание в 15:00',
      time: '13:45',
      unread: 0,
      avatar: 'РГ',
      online: false,
      type: 'group'
    },
    {
      id: '3',
      name: 'Канал новостей',
      lastMessage: 'Обновление системы',
      time: '12:15',
      unread: 5,
      avatar: 'КН',
      online: false,
      type: 'channel'
    },
    {
      id: '4',
      name: 'Иван Сидоров',
      lastMessage: 'Голосовое сообщение',
      time: '11:20',
      unread: 1,
      avatar: 'ИС',
      online: true,
      type: 'direct'
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      sender: 'Анна Петрова',
      content: 'Привет! Как твои дела?',
      time: '14:30',
      type: 'text',
      isOwn: false
    },
    {
      id: '2',
      sender: 'Ты',
      content: 'Всё отлично! А у тебя как?',
      time: '14:31',
      type: 'text',
      isOwn: true
    },
    {
      id: '3',
      sender: 'Анна Петрова',
      content: 'Как дела? 😊',
      time: '14:32',
      type: 'text',
      isOwn: false
    },
    {
      id: '4',
      sender: 'Ты',
      content: '',
      time: '14:33',
      type: 'voice',
      isOwn: true,
      duration: '0:15',
      voiceEffect: 'robot'
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage('');
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setShowVoiceEffects(true);
    }
  };

  const handleApplyVoiceEffect = (effect: string) => {
    setCurrentVoiceEffect(effect);
    setShowVoiceEffects(false);
  };

  const getChatIcon = (type: string) => {
    switch (type) {
      case 'group': return 'Users';
      case 'channel': return 'Hash';
      default: return 'User';
    }
  };

  return (
    <div className="flex h-screen bg-wore-background">
      {/* Sidebar */}
      <div className="w-80 bg-wore-darker border-r border-wore-lighter flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-wore-lighter">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-wore-text-bright">Wore Messenger</h1>
            <Button variant="ghost" size="sm" className="text-wore-text-muted hover:text-wore-text-bright">
              <Icon name="Settings" size={18} />
            </Button>
          </div>
          <div className="relative">
            <Input
              placeholder="Поиск чатов..."
              className="bg-wore-lighter border-none text-wore-text placeholder:text-wore-text-muted"
            />
            <Icon name="Search" size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-wore-text-muted" />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-wore-lighter">
          <Button variant="ghost" className="flex-1 text-wore-accent hover:text-wore-accent-hover border-b-2 border-wore-accent rounded-none">
            Все чаты
          </Button>
          <Button variant="ghost" className="flex-1 text-wore-text-muted hover:text-wore-text">
            Контакты
          </Button>
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {chats.map((chat) => (
              <Card
                key={chat.id}
                className={`p-3 mb-2 cursor-pointer transition-colors border-none ${
                  selectedChat === chat.id 
                    ? 'bg-wore-lighter' 
                    : 'bg-transparent hover:bg-wore-lighter/50'
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-wore-accent text-wore-text-bright text-sm">
                        {chat.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-wore-online rounded-full border-2 border-wore-darker"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <Icon name={getChatIcon(chat.type)} size={14} className="text-wore-text-muted" />
                      <p className="text-sm font-medium text-wore-text-bright truncate">{chat.name}</p>
                    </div>
                    <p className="text-xs text-wore-text-muted truncate">{chat.lastMessage}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-xs text-wore-text-muted">{chat.time}</span>
                    {chat.unread > 0 && (
                      <span className="bg-wore-accent text-wore-text-bright text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 bg-wore-darker border-b border-wore-lighter">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-wore-accent text-wore-text-bright text-sm">
                  АП
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-wore-text-bright">Анна Петрова</h2>
                <p className="text-xs text-wore-online">в сети</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-wore-text-muted hover:text-wore-text-bright">
                <Icon name="Phone" size={18} />
              </Button>
              <Button variant="ghost" size="sm" className="text-wore-text-muted hover:text-wore-text-bright">
                <Icon name="Video" size={18} />
              </Button>
              <Button variant="ghost" size="sm" className="text-wore-text-muted hover:text-wore-text-bright">
                <Icon name="MoreVertical" size={18} />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isOwn 
                    ? 'bg-wore-accent text-wore-text-bright' 
                    : 'bg-wore-lighter text-wore-text'
                }`}>
                  {message.type === 'text' ? (
                    <p className="text-sm">{message.content}</p>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                        <Icon name="Play" size={14} />
                      </Button>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 h-1 bg-wore-text-muted rounded-full">
                            <div className="w-1/3 h-full bg-wore-text-bright rounded-full"></div>
                          </div>
                          <span className="text-xs">{message.duration}</span>
                        </div>
                        {message.voiceEffect && (
                          <div className="flex items-center space-x-1 mt-1">
                            <Icon name="Sparkles" size={12} className="text-wore-accent" />
                            <span className="text-xs text-wore-accent">{message.voiceEffect}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-wore-text-muted mt-1">{message.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 bg-wore-darker border-t border-wore-lighter">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-wore-text-muted hover:text-wore-text-bright">
              <Icon name="Paperclip" size={18} />
            </Button>
            
            <div className="flex-1 relative">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Написать сообщение..."
                className="bg-wore-lighter border-none text-wore-text placeholder:text-wore-text-muted pr-20"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <Button variant="ghost" size="sm" className="text-wore-text-muted hover:text-wore-accent p-1 h-6 w-6">
                  <Icon name="Smile" size={14} />
                </Button>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className={`${
                isRecording ? 'bg-red-500 text-white' : 'text-wore-text-muted hover:text-wore-accent'
              } transition-colors`}
              onClick={toggleRecording}
            >
              <Icon name="Mic" size={18} />
            </Button>

            {isRecording && (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-wore-accent hover:text-wore-accent-hover"
                  onClick={() => setShowVoiceEffects(!showVoiceEffects)}
                >
                  <Icon name="Sparkles" size={16} />
                </Button>
                <span className="text-xs text-wore-text-muted">Эффекты</span>
                {currentVoiceEffect && (
                  <span className="text-xs text-wore-accent">{currentVoiceEffect}</span>
                )}
              </div>
            )}

            <Button 
              onClick={handleSendMessage}
              className="bg-wore-accent hover:bg-wore-accent-hover text-wore-text-bright"
            >
              <Icon name="Send" size={18} />
            </Button>
          </div>
          
          {/* Voice Effects Panel */}
          <VoiceEffects
            isVisible={showVoiceEffects}
            onClose={() => setShowVoiceEffects(false)}
            onApplyEffect={handleApplyVoiceEffect}
          />
        </div>
      </div>
    </div>
  );
};

export default WoreMessenger;