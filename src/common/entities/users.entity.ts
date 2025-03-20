import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Users')
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ 
        type: 'varchar', 
        length: 255, 
        nullable: false 
    })
    name: string;

    @Column({ 
        type: 'varchar', 
        length: 20, 
        unique: true, 
        nullable: false 
    })
    mobile: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    @Exclude()
    password: string;

    @Column({ type: 'boolean', default: false })
    status: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    lastLogin: Date;

    @Column({ type: 'varchar', length: 50, nullable: true, default: null })
    ipAddress: string | null;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
