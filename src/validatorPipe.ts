import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
    public transform(age: any, metadata: ArgumentMetadata) {
        if (age < 0 || age > 150) {
            throw new Error('Age error!');
        }
        const ageData = {
            0: 'child',
            18: 'adult',
        };
        let prevIndex = 'child';
        for (const ageIndex in ageData) {
            const prevLabel = ageData[prevIndex];
            if (age < ageIndex) {
                return prevLabel;
            }
            prevIndex = ageIndex;
        }
        return 'old';
    }
}