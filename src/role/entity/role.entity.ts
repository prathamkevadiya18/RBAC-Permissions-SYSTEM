import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import slugify from 'slugify';

@Entity()
export class role{

    @PrimaryGeneratedColumn('uuid')
    id !:string;
    
    @Column()
    name !: string;
    
    @Column()
    status !: boolean;
    
    @Column({ type: 'varchar', nullable: true })
    slug!: string ;
    
    @CreateDateColumn({ type: 'timestamp' })
     createat !: Date;
    
    @UpdateDateColumn({ type: 'timestamp' })
     updateat !: Date;

    @DeleteDateColumn({type: 'timestamp' })
     deleteat !: Date;

    @BeforeInsert()
     genslug(){
         this.slug = slugify(this.name, { lower: true, strict: true });
     }
}