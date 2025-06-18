import React from 'react';
import { CheckCircle, Circle, Loader2 } from 'lucide-react'; // Icons for steps

export interface Step {
  id: string;
  name: string;
  description?: string;
}

export enum StepStatus {
  Pending = 'pending',
  InProgress = 'inProgress',
  Completed = 'completed',
}

interface OrderStatusStepperProps {
  steps: Step[];
  currentStepId: string;
  stepStatuses: Record<string, StepStatus>; // Map step ID to its status
  orientation?: 'horizontal' | 'vertical';
}

const OrderStatusStepper: React.FC<OrderStatusStepperProps> = ({
  steps,
  currentStepId,
  stepStatuses,
  orientation = 'horizontal',
}) => {
  console.log("Rendering OrderStatusStepper, current step:", currentStepId);

  if (!steps || steps.length === 0) {
    return <p>No order steps defined.</p>;
  }

  const getStepIcon = (stepId: string) => {
    const status = stepStatuses[stepId];
    if (status === StepStatus.Completed) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    if (status === StepStatus.InProgress) {
      return <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />;
    }
    return <Circle className="w-5 h-5 text-gray-400" />;
  };

  const isStepActiveOrCompleted = (stepId: string) => {
    const status = stepStatuses[stepId];
    return status === StepStatus.Completed || status === StepStatus.InProgress;
  };
  
  const currentStepIndex = steps.findIndex(step => step.id === currentStepId);


  return (
    <div className={`flex ${orientation === 'horizontal' ? 'flex-row space-x-2 sm:space-x-4 items-start' : 'flex-col space-y-4'} w-full`}>
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className={`flex ${orientation === 'horizontal' ? 'flex-col items-center text-center' : 'flex-row items-start'} relative`}>
            <div className={`flex items-center justify-center rounded-full w-8 h-8 border-2 ${
                isStepActiveOrCompleted(step.id) ? 'border-orange-500' : 'border-gray-300'
              } ${stepStatuses[step.id] === StepStatus.Completed ? 'bg-green-500 border-green-500' : ''}
                 ${stepStatuses[step.id] === StepStatus.InProgress ? 'bg-orange-100' : ''}
              `}
            >
              {stepStatuses[step.id] === StepStatus.Completed ?
                <CheckCircle className="w-5 h-5 text-white" /> :
                getStepIcon(step.id)
              }
            </div>
            <div className={`mt-1 ${orientation === 'horizontal' ? 'text-xs sm:text-sm' : 'ml-3'}`}>
              <p className={`font-medium ${isStepActiveOrCompleted(step.id) ? 'text-orange-600' : 'text-gray-700'}`}>
                {step.name}
              </p>
              {step.description && orientation === 'vertical' && (
                <p className="text-xs text-gray-500">{step.description}</p>
              )}
            </div>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className={`flex-auto ${orientation === 'horizontal' ? 'border-t-2 mt-4' : 'border-l-2 ml-4 h-auto min-h-[2rem]'} ${
                index < currentStepIndex || stepStatuses[steps[index+1]?.id] === StepStatus.Completed || stepStatuses[steps[index+1]?.id] === StepStatus.InProgress ? 'border-orange-500' : 'border-gray-300'
              } transition-colors duration-300`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default OrderStatusStepper;